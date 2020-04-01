import React from "react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { Link } from "react-router-dom";

export default class PanelPage extends React.Component {
     
  render() {
     return  <div className="bg-secondary">
                <Header color="bg-success"/>
                <main>
                  <div className="row">
                    <div className="col-md-8 offset-md-2 col-sm-10 offset-sm-1 fon">
                      <Link to="/panel/product">Ссылка на каталог товаров</Link>            
                    </div>
                  </div>
                </main>
                <Footer/>
            </div>
  }
}