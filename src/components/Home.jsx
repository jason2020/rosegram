import React, { Component } from "react";
import axios from "axios";
import { AwesomeButton } from "react-awesome-button";
import ReactLoading from "react-loading";

import Card from "./Card";
import ContentForm from "./ContentForm";
import StageButton from "./StageButton";
import SubmitSuccess from "./SubmitSuccess";
import "react-bulma-components/dist/react-bulma-components.min.css";

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
      showCardContents: false,
      showLoading: false, // show loading bar after submitting a card
    };

    this.handleFormData = this.handleFormData.bind(this);

    // API
    this.api = axios.create({ baseURL: process.env.REACT_APP_BACKEND_DOMAIN || "/api" });
  }

  handleFormData(formData) {
    this.setState(formData);
  }

  async handleFormSubmit() {
    const { message, recipientEmail, recipientName, sender } = this.state;
    // REQUIRED: "message", "recipientName", "recipientEmail", "sender", "cardDesign"
    try {
      await this.api.post("/cards", {
        message,
        recipientName,
        recipientEmail,
        sender,
        cardDesign: 1,
      });
      setTimeout(() => this.setState({ stage: 5 }), 2000);
    } catch (e) {
      // TODO display error message
      console.log(e, e.response);
    }
  }

  render() {
    // Conditionally render components based on what stage we are on
    const { stage, message, recipientEmail, recipientName, showCardContents, showLoading } = this.state;
    let stageComps;
    if (stage === 1) {
      stageComps = <StageButton message="Get Started" handleClick={() => this.setState({ stage: 2 })} />;
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
            handleClick={async () => {
              this.setState({ showLoading: true });
              await this.handleFormSubmit();
            }}
          />
          {/* <progress style={{ color: "white !important" }} className="progress is-dark" max="100" /> */}
        </>
      );
    } else if (stage === 5) {
      stageComps = <SubmitSuccess />;
    }

    return (
      <>
        <div className="container has-text-centered">
          <Card showCardContents={(showCardContents || stage === 3) && stage !== 5} message={message} />
          {stageComps}
          <br />
          <br />
          <br />
        </div>
      </>
    );
  }
}
