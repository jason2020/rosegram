import React, { Component } from "react";

import Card from "./Card";
import ContentForm from "./ContentForm";
import GetStarted from "./GetStarted";
import "react-bulma-components/dist/react-bulma-components.min.css";

export default class Home extends Component {
  /*
   * Stage 1: initial display of website. Next Step: user clicks "Write Message"
   * Stage 2: user enters textbox screen. Next Step: user clicks "Next"
   * Stage 3: user enters recipient name and email. Next Step: user clicks "Submit"
   * Stage 4: done. display thank you message.
   */
  constructor(props) {
    super(props);

    this.state = {
      stage: 1,
      message: "",
      // receiver: "",
      // sender: "",
    };

    this.handleFormData = this.handleFormData.bind(this);
  }

  handleFormData({ message }) {
    this.setState({ message });
  }

  render() {
    // Conditionally render components based on what stage we are on
    const { stage, message } = this.state;
    let stageComps;
    if (stage === 1) {
      stageComps = <GetStarted handleClick={() => this.setState({ stage: 2 })} />;
    } else if (stage === 2) {
      stageComps = <ContentForm handleFormData={this.handleFormData} />;
    }

    return (
      <>
        <div className="container has-text-centered">
          <Card showCardContents={stage === 2} message={message} />
          {stageComps}
        </div>
      </>
    );
  }
}
