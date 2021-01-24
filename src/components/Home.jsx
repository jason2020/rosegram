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
    };
  }

  render() {
    // Conditionally render components based on what stage we are on
    const { stage } = this.state;
    let stageComps;
    if (stage === 1) {
      stageComps = (
        <GetStarted handleClick={() => this.setState({ stage: 2 })} />
      );
    } else if (stage === 2) {
      stageComps = <ContentForm />;
    }

    return (
      <>
        <div style={{ border: "2px solid black" }}>
          <h1>DEBUGGING DELETE LATER BRANDON</h1>
          <p>{stage}</p>
        </div>
        <div className="container has-text-centered">
          <Card stage={stage} />
          {stageComps}
        </div>
      </>
    );
  }
}
