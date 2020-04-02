import React from "react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { Link } from "react-router-dom";
const fetch = require("node-fetch");

export default class PanelProductsPage extends React.Component {
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
        if (Object.keys(json).length != 0) {
          this.setState({
            products: json,
            status: "ready"
          })
        } else {
          this.setState({
            status: "error"
          })
        }        
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
      const linkProduct = "/panel/product/" + product._id;
      const imgProduct = "/" + product.img;
      return (
        <div className="card" key={product.key} slug={product.slug} id={product._id}>
          <img className="card-img-top" src={imgProduct} alt="Card image cap" />
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
                <Header color="bg-success"/>
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
                <Footer/>
            </div>
  }
}