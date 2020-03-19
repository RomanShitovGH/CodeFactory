import React from "react";
import ReactDOM from "react-dom";

import { Router, Route, Switch } from "react-router-dom";
import Page1 from "./pages/IndexPage.jsx";
import Page2 from "./pages/ProductPage.jsx";
//import Page3 from "./pages/page3.jsx";

import { createBrowserHistory } from "history";
const history = createBrowserHistory();

//import ProductPage from "./pages/ProductPage.jsx";
import IndexPage from "./pages/IndexPage.jsx";

class App extends React.Component {
  render() {
    return  <Router history={ history }>
              <Switch>
                <Route exact path="/" component={ Page1 } />
                <Route exact path="/product/:product" component={ Page2 } />
              </Switch>
            </Router>;
  }
}

const app = <App />;

ReactDOM.render(app, document.querySelector("#root"));
