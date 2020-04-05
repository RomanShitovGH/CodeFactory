import React from "react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

export default class NotFound extends React.Component {
      
  render() {
     return  <div className="bg-secondary">
                <Header color="bg-primary"/>
                <main>
                  <div className="row">
                    <div className="col-md-8 offset-md-2 col-sm-10 offset-sm-1 fon">
                      Страница не найдена     
                    </div>
                  </div>
                </main>
                <Footer/>
            </div>
  }
}