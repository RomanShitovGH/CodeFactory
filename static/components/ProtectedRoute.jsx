import React from "react";

import { Route, Redirect } from "react-router-dom";

const jwt = require("jsonwebtoken");
const SECRET = "Любая строка со случайным набором символов";
const Cookie = require('cookie');

export default class ProtectedRoute extends React.Component {
  constructor(props) {
    super(props)
    console.log(document.cookie);
    try {
        if (document.cookie) {
            const cookies = Cookie.parse(document.cookie);
            const payload = jwt.verify(cookies.token, SECRET);        
            this.state = {isAuthorized : true};
        } else {
            this.state = {isAuthorized : false};
        }
    } catch(error) {
        this.state = {isAuthorized : false}; 
    }
}
  render() {
    if (this.state.isAuthorized) {
        return <Route { ...this.props } />
    } else {
        return <Redirect to="/panel/login" from={ this.props.path } />
    }
    
  }
}
