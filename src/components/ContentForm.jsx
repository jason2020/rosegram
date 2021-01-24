import React, { Component } from "react";
import TextBox from "./TextBox";

export default class ContentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { handleFormData } = this.props;
    return (
      <>
        <TextBox handleFormData={handleFormData} />
      </>
    );
  }
}
