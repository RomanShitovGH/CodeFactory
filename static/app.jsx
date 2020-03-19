import React from "react";
import ReactDOM from "react-dom";

import ProductPage from "./pages/ProductPage.jsx";

class App extends React.Component {
  render() {
    return <ProductPage></ProductPage>;
  }
}

const app = <App />;

ReactDOM.render(app, document.querySelector("#root"));
