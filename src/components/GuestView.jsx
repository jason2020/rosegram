import React, { Component } from "react";
import { AwesomeButton } from "react-awesome-button";
import Card from "./Card";

/*
 * This is a main view component. A "guest" comes to this website to view a card that someone else wrote for them.
 * React Router takes them to this page (component).
 */
export default class GuestView extends Component {
  /*
   * Stage 1: initial display of card. Next Step: user clicks "Open Card"
   * Stage 2: user sees card contents. Next Step: user clicks "Close Card"
   * Stage 3: done. display option to write your own card to the user (take them to the homepage)
   */
  constructor(props) {
    super(props);

    this.state = {
      stage: 1,
    };

    this.handleClick = this.handleClick.bind(this); // https://stackoverflow.com/questions/32317154/react-uncaught-typeerror-cannot-read-property-setstate-of-undefined
  }

  componentDidMount() {
    // FETCH API HERE
  }

  handleClick() {
    this.setState((state) => ({
      stage: state.stage + 1,
    }));
  }

  render() {
    // Conditionally render components based on what stage we are on
    const { stage } = this.state;
    // eslint-disable-next-line react/prop-types, react/destructuring-assignment
    const { cardId } = this.props.match.params;

    return (
      <>
        <div className="container has-text-centered">
          <Card stage={stage} />
          {/* See GetStarted.jsx for more info in clickable divs in React */}
          <div
            role="button"
            tabIndex={0}
            onClick={this.handleClick}
            onKeyDown={this.handleClick}
          >
            <AwesomeButton type="primary">Open</AwesomeButton>
          </div>
        </div>
      </>
    );
  }
}
