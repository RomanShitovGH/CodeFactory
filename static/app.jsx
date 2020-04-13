import React from "react";
import ReactDOM from "react-dom";

import { Router, Route, Switch } from "react-router-dom";
import IndexPage from "./pages/IndexPage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import PanelPage from "./pages/PanelPage.jsx";
import PanelProductsPage from "./pages/PanelProductsPage.jsx";
import PanelProductPage from "./pages/PanelProductPage.jsx";
import NotFound from "./pages/NotFound.jsx";

import { createBrowserHistory } from "history";
const history = createBrowserHistory();

class App extends React.Component {
  render() {
    return  <Router history={ history }>
              <Switch>
                <Route exact path="/" component={ IndexPage } />
                <Route exact path="/products/:product" component={ ProductPage } />
                <Route exact path="/panel" component={ PanelPage } />
                <Route exact path="/panel/products" component={ PanelProductsPage } />
                <Route exact path="/panel/products/:id" component={ PanelProductPage } />
                <Route component={ NotFound } />
              </Switch>
            </Router>;
  }
}

const app = <App />;

ReactDOM.render(app, document.querySelector("#root"));