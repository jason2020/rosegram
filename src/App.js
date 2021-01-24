import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import "react-bulma-components/dist/react-bulma-components.min.css";
import GuestView from "./components/GuestView";
import Home from "./components/Home";

export default function App() {
  return (
    <>
      <Router>
        <Switch>
          {/* GUEST VIEW PAGE - A user visiting a card someone else wrote for them sees this view. */}
          <Route path="/card/:cardId" component={GuestView} />

          {/* HOMEPAGE - This is where a user will create a card. */}
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </>
  );
}
