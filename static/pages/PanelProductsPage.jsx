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
      newProduct: {
        title : "", 
        img : "product1.png", 
        description : "", 
        price : 0, 
        key : 0, 
        slug : ""
      },
      status: "idle"  
    }
  }
  
  componentDidMount() {
    this.setState({
      status: "pending"
    });
    fetch("/api/products", {
      credentials: "same-origin"
    })
      .then(function (response) {
        if (response.status === 401 || response.status === 403) {
          window.location = "/panel/login";
        }
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
      const linkProduct = "/panel/products/" + product._id;
      const imgProduct = "/" + product.img;
      return (
        <div className="card" key={product.key} slug={product.slug} id={product._id}>
          <img className="card-img-top" src={imgProduct} alt="Card image cap" />
          <div className="card-body">
            <h5 className="card-title">{product.title}</h5>
            <p className="card-text">{product.description}</p>
            <p className="card-text">Цена: {product.price}</p>
            <Link to={linkProduct}>Изменить</Link>
          </div>
        </div>
      );
    })
  }

  renderNewProduct() {
    return (
      <form>
        <label>Добавить новый товар: </label>
        <div className="form-group">
          <label>Название: </label>
          <input  
            name="title"             
            type="text" 
            value={ this.state.newProduct.title }
            onChange={ this.onChange.bind(this) }/>
          <br/>
          <label>Описание: </label>
          <textarea  
            name="description"             
            type="text"
            value={ this.state.newProduct.description }
            onChange={ this.onChange.bind(this) }/>
          <br/>
          <label>Цена: </label>
          <textarea  
            name="price"             
            type="text"
            value={ this.state.newProduct.price }
            onChange={ this.onChange.bind(this) }/>
          <br/>
          <label>Ключ: </label>
          <input  
            name="key"             
            type="text" 
            value={ this.state.newProduct.key }
            onChange={ this.onChange.bind(this) }/>
          <br/>
          <label>Слаг: </label>
          <input  
            name="slug"             
            type="text" 
            value={ this.state.newProduct.slug }
            onChange={ this.onChange.bind(this) }/>
        </div>
        <button type="button" className="btn btn-primary" onClick={ this.onAdd.bind(this) }>Добавить</button>
      </form>
    ) 
  }

  onChange (event) {
    const name = event.target.name;
    const prod = this.state.newProduct;
    prod[name] = event.target.value;
    this.setState({ newProduct: prod });
  }

  onAdd (event) {
    event.preventDefault();
    fetch(`/api/products`, {
      method: "post",
      body: JSON.stringify(this.state.newProduct),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => { 
      return response.json();  
    })
    .then(json => {
      this.setState({
        products: [ ...this.state.products, json ],  
        newProduct: {
          title : "", 
          img : "product1.png", 
          description : "", 
          price : 0, 
          key : 0, 
          slug : ""
        }
      })
      
    })
  }

  render() {
     return  <div className="bg-secondary">
                <Header color="bg-success"/>
                <main>
                  <div className="row">
                    <div className="col-md-8 offset-md-2 col-sm-10 offset-sm-1 fon">
                      { this.renderStatus() }
                      { this.renderNewProduct() }
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