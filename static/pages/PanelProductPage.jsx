import React from "react";
import Nav from "../components/Navigation.jsx";
import Header from "../components/Header.jsx";
import ProductBox from "../components/ProductBox.jsx";
import Footer from "../components/Footer.jsx";
import { Link } from "react-router-dom";

export default class PanelProductPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      product: {},
      status: "idle"  
    }
  }
  
  componentDidMount() {
    fetch(`/api/products/${this.props.match.params.id}`, {
      method: "get",
      credentials: "same-origin"
    })
      .then(response => { 
        return response.json();  
      })
      .then(json => {
        this.setState({
          product: json,
          status: "ready"  
        })
        
      })
      .catch(error => {
        this.setState({
          status: "error"
        })
      })           
  }
  
  onChange (event) {
    const name = event.target.name;
    const prod = this.state.product;
    prod[name] = event.target.value;
    this.setState({ product: prod });
  }

  onSave (event) {
    event.preventDefault();
    fetch(`/api/products/${this.props.match.params.id}`, {
      method: "put",
      body: JSON.stringify(this.state.product),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => { 
      return response.json();  
    })
    .then(json => {
      this.setState({
        product: json  
    })
    })
  }

  renderProduct() {
    if (this.state.status !== "error") {
      return (  
        <ProductBox title={this.state.product.title}>
          <Nav tabs={[ "Описание", "Характеристики", "Отзывы" ]} className="nav nav-tabs"/>
          <div className="row">
            <div className="col-3">
              <img className="img-fluid" src={"/"+this.state.product.img}/>
            </div>
            <div className="col-9">
              <p>{this.state.product.description}</p>
              <p>Цена: {this.state.product.price}</p>
              <hr/>
              { this.renderForm() }
            </div>
          </div>
        </ProductBox> 
      )
      } 
    }
  
  renderForm() {
    return (
      <form>
        <label>Редактирование товара: </label>
        <div className="form-group">
          <label>Название товара: </label>
          <input  
            name="title"             
            type="text" 
            value={ this.state.product.title } 
            onChange={ this.onChange.bind(this) }/>
          <br/>
          <label>Описание товара: </label>
          <textarea  
            name="description"             
            type="text"
            value={ this.state.product.description }  
            onChange={ this.onChange.bind(this) }/>
          <br/>
          <label>Ключ: </label>
          <input  
            name="key"             
            type="text" value={ this.state.product.key } 
            onChange={ this.onChange.bind(this) }/>
          <br/>
          <label>Слаг: </label>
          <input  
            name="slug"             
            type="text" value={ this.state.product.slug } 
            onChange={ this.onChange.bind(this) }/>
        </div>
        <button type="button" className="btn btn-primary" onClick={ this.onSave.bind(this) }>Сохранить</button>
      </form>
    )
  }  

  renderStatus() {
    switch (this.state.status) {
      case "ready":
        return ( <div className="alert alert-primary" role="alert">
                 Данные загружены
               </div> );
      case "error":
        return ( <div className="alert alert-danger" role="alert">
                 Ошибка при получении данных. Код 500
               </div> );
      case "pending":
        return ( <div className="alert alert-warning" role="alert">
                 Загружаю данные
               </div>);
      default:
        return false; 
    }     
  }

  render() {  
     return <div className="bg-secondary">
       		    <Header color="bg-success"/>
              <main>
                <div className="row">
                  <div className="col-md-8 offset-md-2 col-sm-10 offset-sm-1 fon">
                    <nav aria-label="breadcrumb">
                      <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                          <Link to="/panel/products">Каталог</Link>
                        </li>
                        <li className="breadcrumb-item"><a href="#">Вентиляция</a></li>
                        <li className="breadcrumb-item active" aria-current="page">ПВУ</li>
                      </ol>
                    </nav>
                    { this.renderStatus() }
                    { this.state.product && this.renderProduct() }
                  </div>
                </div>
              </main>
              <Footer/>
           	</div>
  }
}