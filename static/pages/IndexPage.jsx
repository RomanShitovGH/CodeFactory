import React from "react";
import Nav from "../components/Navigation.jsx";
import { Link } from "react-router-dom";
const fetch = require("node-fetch");

export default class IndexPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      products: [],
      status: "idle"  
    }
  }
  
  componentDidMount() {
    this.setState({
      status: "pending"
    });
    fetch("/api/products")
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        
        this.setState({
          products: json,
          status: "ready"
        })        
      }.bind(this))
      .catch(function(err) {
        this.setState({
            status: "error"
          });
        }) 
  }
  
  renderStatus() {
    switch (this.state.status) {
      case "ready":
        return ( <div className="alert alert-primary" role="alert">
                 Данные загружены
               </div> );
      case "error":
        return ( <div className="alert alert-danger" role="alert">
                 Ошибка при получении данных
               </div> );
      case "pending":
        return ( <div className="alert alert-warning" role="alert">
                 Загружаю данные
               </div>);
      default:
        return false; 
    }     
  }

  renderProducts() {
    return this.state.products.map(product => {
      const linkProduct = "/product/" + product.key;
      return (
        <div className="card" key={product.key} slug={product.key}>
          <img className="card-img-top" src={product.img} alt="Card image cap" />
          <div className="card-body">
            <h5 className="card-title">{product.title}</h5>
            <p className="card-text">{product.description}</p>
            <p className="card-text">Цена: {product.price}</p>
            <Link to={linkProduct}>Купить</Link>
          </div>
        </div>
      );
    })
  }
      
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
                      {this.renderStatus()}
                      <div className="card-deck">
                        { 
                          this.state.products
                            ? this.renderProducts() 
                              : false
                        }
                      </div>      
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