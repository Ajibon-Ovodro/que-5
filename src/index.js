import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "./assets/vendor/nucleo/css/nucleo.css";
import "./assets/vendor/font-awesome/css/font-awesome.min.css";
import "./assets/scss/argon-design-system-react.scss?v1.1.0";


import Posts from "./views/posts";
import Category from "./views/cateogroy";
import SinglePost from "./views/single-post";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" exact render={props => <Posts {...props} />} />
      <Route
        path="/posts"
        exact
        render={props => <Posts {...props} />}
      />
      <Route
        path="/post"
        exact
        render={props => <SinglePost {...props} />}
      />
      <Route
        path="/category"
        exact
        render={props => <Category {...props} />}
      />
      <Redirect to="/" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
