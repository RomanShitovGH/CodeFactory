import React from "react";
import Nav from "../components/Navigation.jsx";
import { Link } from "react-router-dom";

export default class PanelPage extends React.Component {
     
  render() {
     return  <div className="bg-secondary">
                <header className="bg-primary">
                  <div className="row">
                    <div className="col-md-8 offset-md-2 col-sm-10 offset-sm-1">
                      <nav className="navbar navbar-expand navbar-dark bg-primary">
                        <div className="collapse navbar-collapse">
                          <Nav tabs={[ "Каталог", "Доставка", "Гарантии", "Контакты" ]} className="navbar-nav"/>  
                        </div>
                      </nav>
                    </div>
                  </div>
                </header>
                <main>
                  <div className="row">
                    <div className="col-md-8 offset-md-2 col-sm-10 offset-sm-1 fon">
                      <Link to="/panel/product">Ссылка на каталог товаров</Link>            
                    </div>
                  </div>
                </main>
                <footer className="bg-secondary">
                    <div className="row">
                        <div className="col-md-8 offset-md-2 col-sm-10 offset-sm-1 bg-secondary">
                            &copy; Codery.camp, 2020
                        </div>
                    </div>
                </footer>
            </div>
  }
}