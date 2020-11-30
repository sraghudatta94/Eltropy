import React from "react";
import { Router, Route, Switch } from "react-router-dom";

import history from "../history";
import Home from "./Home";
import Header from "./Header";

import "../css/index.css";
import SongDetails from "./SongDetails";

class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <div
        //   style={{
        //     position: "relative",
        //     minHeight: "100vh"
        //   }}
        >
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/song/:id" component={SongDetails} />
          </Switch>
        </div>
      </Router>
    );
  }
}
export default App;
