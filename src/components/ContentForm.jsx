import React from "react";
import { Formik, Field, Form } from "formik";
import PropTypes from "prop-types";
import "./ContentForm.module.css";
import "react-awesome-button/dist/styles.css";

// https://formik.org/docs/examples/basic
// https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/issues/302
export default class ContentForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {}; // message: "", recipientEmail: "", recipientName: "", sender: ""
  }

  handleChange(e) {
    const { handleFormData } = this.props;
    const key = e.target.id;
    // this.setState({ [key]: e.target.value });
    handleFormData({ [key]: e.target.value });
  }

  render() {
    const { fields } = this.props;
    const displayFields = fields.split(" ");
    return (
      <Formik initialValues={{ message: "", recipientEmail: "", sender: "", recipientName: "" }}>
        {() => (
          // {({ values }) => (
          <Form onChange={(e) => this.handleChange(e)}>
            <div style={{ display: displayFields.indexOf("recipientName") > -1 ? "initial" : "none" }}>
              <label className="label" htmlFor="recipientName">
                Recipent Name:
              </label>
              <Field className="input" id="recipientName" name="recipientName" type="text" required="required" />
            </div>

            <div style={{ display: displayFields.indexOf("recipientEmail") > -1 ? "initial" : "none" }}>
              <br />
              <br />
              <br />
              <label className="label" htmlFor="recipientEmail">
                Recipent Email:
              </label>
              <Field className="input" id="recipientEmail" name="recipientEmail" type="email" required="required" />
            </div>

            <div style={{ display: displayFields.indexOf("message") > -1 ? "initial" : "none" }}>
              <label className="label" htmlFor="message" rows="10">
                Message:
              </label>
              <Field as="textarea" className="textarea" id="message" name="message" type="text" required="required" />
            </div>

            <div style={{ display: displayFields.indexOf("sender") > -1 ? "initial" : "none" }}>
              <label className="label" htmlFor="sender" rows="10">
                Sender (Optional):
              </label>
              <Field className="input" id="sender" name="sender" type="text" />
            </div>
            <br />
            <br />
            <br />
          </Form>
        )}
      </Formik>
    );
  }
}

ContentForm.propTypes = {
  fields: PropTypes.string.isRequired,
  handleFormData: PropTypes.func.isRequired,
};
