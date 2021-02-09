import React, { Component } from "react";
import axios from "axios";
import { AwesomeButton } from "react-awesome-button";
import ReactLoading from "react-loading";

import Card, { designDictionary } from "./Card";
import ContentForm from "./ContentForm";
import StageButton from "./StageButton";
import SubmitSuccess from "./SubmitSuccess";
import "react-bulma-components/dist/react-bulma-components.min.css";

const CARDS_AMOUNT = Object.keys(designDictionary).length;
export default class Home extends Component {
  /*
   * Stage 1: initial display of website. Next Step: user clicks "Start"
   * Stage 2: user enters recipient name and email. Next Step: user clicks "Write Message"
   * Stage 3: user enters textbox screen. Next Step: user clicks "Next"
   * Stage 4: user enters From field (optional). Next Step: user clicks "Submit"
   * Stage 5: done. display thank you message.
   */
  constructor(props) {
    super(props);

    this.state = {
      stage: 1,
      message: "",
      recipientEmail: "",
      recipientName: "",
      sender: "",
      cardDesign: 0,
      showCardContents: false,
      showLoading: false, // show loading bar after submitting a card
    };

    this.handleFormData = this.handleFormData.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);

    // API
    this.api = axios.create({ baseURL: process.env.REACT_APP_BACKEND_DOMAIN || "/api" });
  }

  handleFormData(formData) {
    this.setState(formData);
  }

  async handleFormSubmit() {
    const { message, recipientEmail, recipientName, sender, cardDesign } = this.state;
    this.setState({ showLoading: true });
    // REQUIRED: "message", "recipientName", "recipientEmail", "sender", "cardDesign"
    try {
      await this.api.post("/cards", {
        message,
        recipientName,
        recipientEmail,
        sender,
        cardDesign,
      });
      setTimeout(() => this.setState({ stage: 5 }), 1500);
    } catch (e) {
      console.log(e, e.response);
      alert("Error with card creation. Press OK to try again.");
      this.setState({ showLoading: false, stage: 2 });
    }
  }

  render() {
    // Conditionally render components based on what stage we are on
    const { stage, message, recipientEmail, recipientName, cardDesign, showCardContents, showLoading } = this.state;
    let stageComps;

    if (stage === 1) {
      stageComps = (
        <>
          {/* https://stackoverflow.com/questions/19999877/loop-seamlessly-over-an-array-forwards-or-backwards-given-an-offset-larger-than/20000227 */}
          <AwesomeButton
            className="awesome-button"
            onPress={() =>
              this.setState((state) => ({
                // decrease card design
                cardDesign: (((state.cardDesign - 1) % CARDS_AMOUNT) + CARDS_AMOUNT) % CARDS_AMOUNT,
              }))
            }
          >
            &#x2190;
          </AwesomeButton>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <AwesomeButton
            className="awesome-button"
            // increase card design
            onPress={() => this.setState((state) => ({ cardDesign: (state.cardDesign + 1) % CARDS_AMOUNT }))}
          >
            &#x2192;
          </AwesomeButton>
          <br />
          <br />
          <StageButton
            message="Get Started"
            handleClick={() => this.setState({ stage: 2 })}
            disabled={cardDesign === 0}
          />
        </>
      );
    } else if (stage === 2) {
      stageComps = (
        <>
          <ContentForm fields="recipientName recipientEmail" handleFormData={this.handleFormData} />
          <StageButton
            message="Write Message"
            handleClick={() => this.setState({ stage: 3 })}
            disabled={!recipientEmail || !recipientName}
          />
        </>
      );
    } else if (stage === 3) {
      stageComps = (
        <>
          <ContentForm fields="message" handleFormData={this.handleFormData} />
          <StageButton message="Next" handleClick={() => this.setState({ stage: 4 })} disabled={!message} />
        </>
      );
    } else if (stage === 4) {
      stageComps = (
        <>
          <ContentForm fields="sender" handleFormData={this.handleFormData} />
          <div
            style={{
              display: showLoading ? "block" : "none",
            }}
          >
            <div style={{ paddingRight: "2rem", margin: "0 auto", width: "0%" }}>
              <ReactLoading type="spin" color="#ea9dc0" width="2rem" />
            </div>
          </div>
          <AwesomeButton
            className="awesome-button"
            type="primary"
            style={{ opacity: showLoading ? 0 : 1 }}
            onPress={() => this.setState((state) => ({ showCardContents: !state.showCardContents }))}
          >
            Flip Card
          </AwesomeButton>
          &nbsp;&nbsp;&nbsp;
          <StageButton
            message="Send Rosegram"
            showArrow={false}
            disabled={showLoading}
            handleClick={this.handleFormSubmit}
          />
        </>
      );
    } else if (stage === 5) {
      stageComps = <SubmitSuccess />;
    }

    return (
      <>
        <div className="container has-text-centered">
          <Card
            showCardContents={(showCardContents || stage === 3) && stage !== 5}
            message={message}
            cardDesign={cardDesign}
          />
          {stageComps}
          <br />
          <br />
          <br />
        </div>
      </>
    );
  }
}
