import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import "react-bulma-components/dist/react-bulma-components.min.css";
import GuestView from "./components/GuestView";
import Home from "./components/Home";
import PageNotFound from "./components/PageNotFound";

export default function App() {
  return (
    <>
      <Router>
        <Switch>
          {/* GUEST VIEW PAGE - A user visiting a card someone else wrote for them sees this view. */}
          <Route path="/card/:cardUrl" component={GuestView} />

          {/* HOMEPAGE - This is where a user will create a card. */}
          <Route path="/" component={Home} exact />

          {/* 404 */}
          <Route path="/" component={PageNotFound} />
        </Switch>
      </Router>
    </>
  );
}
