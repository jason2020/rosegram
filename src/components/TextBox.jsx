import React from "react";
import { Formik, Field, Form } from "formik";
import "./TextBox.module.css";
import axios from "axios";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";

// https://formik.org/docs/examples/basic
// https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/issues/302
export default class TextBox extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = { message: "", recipientEmail: "", recipientName: "", sender: "" };

    // API
    this.api = axios.create({ baseURL: process.env.REACT_APP_BACKEND_DOMAIN });
  }

  handleChange() {
    console.log(this.state.message, this.state.recipientEmail, this.state.recipientName, this.state.sender);
  }

  render() {
    return (
      <Formik
        onSubmit={async ({ message, recipientName, recipientEmail, sender = "" }) => {
          // REQUIRED: "message", "recipientName", "recipientEmail", "sender", "cardDesign"
          try {
            const createdCard = await this.api.post("/cards", {
              message,
              recipientName,
              recipientEmail,
              sender,
              cardDesign: 1,
            });
            // TODO change later
            alert(`http://localhost:3000/card/${createdCard.data.cardUrl}`);
          } catch (e) {
            console.log(e, e.response);
          }
        }}
        initialValues={{ message: "", recipientEmail: "", sender: "", recipientName: "" }}
      >
        {/* eslint-disable-next-line no-return-assign */}
        {({ values }) => (
          <Form
            onChange={() => {
              this.props.handleFormData({ message: values.message, receiver: values.receiver, sender: values.sender });
              this.setState({
                message: values.message,
                recipientEmail: values.recipientEmail,
                recipientName: values.recipientName,
                sender: values.sender,
              });
            }}
          >
            <label className="label" htmlFor="recipientEmail">
              Recipent Email:
            </label>
            <Field className="input" id="recipientEmail" name="recipientEmail" type="email" required="required" />

            <label className="label" htmlFor="receiverName">
              Recipent Name:
            </label>
            <Field className="input" id="recipientName" name="recipientName" type="text" required="required" />

            <label className="label" htmlFor="message" rows="10">
              Message:
            </label>
            <Field className="textarea" id="message" name="message" type="text" required="required" />

            <label className="label" htmlFor="sender" rows="10">
              Sender:
            </label>
            <Field className="input" id="sender" name="sender" type="text" />

            <div role="button" tabIndex={0}>
              <AwesomeButton type="primary">SENDDDD</AwesomeButton>
            </div>
          </Form>
        )}
      </Formik>
    );
  }
}
