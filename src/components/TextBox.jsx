import React from "react";
import { Formik, Field, Form } from "formik";
import "./TextBox.module.css";

import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";

// https://formik.org/docs/examples/basic
// https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/issues/302
export default class TextBox extends React.Component {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();
    // this.inputRef.current is null here
  }

  render() {
    return (
      <div>
        <br />
        <br />
        <br />
        <br />
        <Formik
          innerRef={this.inputRef}
          initialValues={{ message: "", receiver: "" }}
          onSubmit={async (values) => {
            await new Promise((resolve) => setTimeout(resolve, 500));
            alert(JSON.stringify(values, null, 2));
          }}
          // eslint-disable-next-line react/destructuring-assignment
        >
          <div className="">
            <Form>
              <div className="">
                <label className="label" htmlFor="receiver">
                  Receiver:
                </label>
                <Field
                  className="input"
                  id="receiver"
                  name="receiver"
                  type="email"
                />
              </div>
              <div className="">
                <label className="label" htmlFor="message" rows="10">
                  Message:
                </label>
                <Field
                  className="textarea"
                  id="message"
                  name="message"
                  type="text"
                />
              </div>
              {/* <div className="">
                <label className="label" id="sender" htmlFor="sender">
                  Sender:
                </label>
                <Field name="sender" type="email" />
              </div> */}
              <div role="button" tabIndex={0}>
                <AwesomeButton type="primary">SENDDDD</AwesomeButton>
              </div>
            </Form>
          </div>
        </Formik>
        <div>{this.inputRef.current}</div>
      </div>
    );
  }
}

const handleData = () => {};
