import React from "react";
import { AwesomeButton } from "react-awesome-button";

export default function SubmitSuccess() {
  return (
    <>
      <div>Your Rosegram has been successfully created and will be sent on Valentine&apos;s Day!</div>
      <br />
      <br />
      <AwesomeButton className="awesome-button" type="primary" onPress={() => window.location.reload()}>
        Write Another Rosegram
      </AwesomeButton>
    </>
  );
}
