import React from "react";
import Nav from "../components/Navigation.jsx";
import ProductBox from "../components/ProductBox.jsx";
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
    fetch("/api/product?id="+this.props.match.params.id)
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
    let name = event.target.name;
    let prod = this.state.product;
    prod[name] = event.target.value;
    this.setState({ prod });
    // this.state.product.title = event.target.value;
    // this.forceUpdate();
  }

  renderProduct() {
    if (this.state.status === "error") {
      return false
    } else {
        return (  
          <ProductBox title={this.state.product.title}>
            <Nav tabs={[ "Описание", "Характеристики", "Отзывы" ]} className="nav nav-tabs"/>
            <div className="row">
              <div className="col-3">
                <img className="img-fluid" src={"/"+this.state.product.img}/>
              </div>
              <div className="col-9">
                <p>{this.state.product.description}</p>
                <p>Цена: {this.state.product.price}</p>y
                <hr/>
                { this.state.product && this.renderForm() }
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
       		  <header className="bg-success">
                <div className="row">
                  <div className="col-md-8 offset-md-2 col-sm-10 offset-sm-1">
                    <nav className="navbar navbar-expand navbar-dark bg-success">
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
                    <nav aria-label="breadcrumb">
                      <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                          <Link to="/panel/product">Каталог</Link>
                        </li>
                        <li className="breadcrumb-item"><a href="#">Вентиляция</a></li>
                        <li className="breadcrumb-item active" aria-current="page">ПВУ</li>
                      </ol>
                    </nav>
                    { this.renderStatus() }
                    { this.renderProduct() }
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