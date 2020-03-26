import React from "react";
import Nav from "../components/Navigation.jsx";
import ProductBox from "../components/ProductBox.jsx";
import { Link } from "react-router-dom";

export default class ProductPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      product: []  
    }
  }
  
  componentDidMount() {
    fetch("/api/products?key="+this.props.match.params.product)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        this.setState({
          product: json
        })        
      }.bind(this))
      .catch(function(err) {
        //
        }) 
  }
  
  
  render() {
     
     return <div className="bg-secondary">
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
                    <nav aria-label="breadcrumb">
                      <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                          <Link to="/">Каталог</Link>
                        </li>
                        <li className="breadcrumb-item"><a href="#">Вентиляция</a></li>
                        <li className="breadcrumb-item active" aria-current="page">ПВУ</li>
                      </ol>
                    </nav>
                    <ProductBox title={this.state.product.title}>
                      <Nav tabs={[ "Описание", "Характеристики", "Отзывы" ]} className="nav nav-tabs"/>
                      <div className="row">
                        <div className="col-3">
                          <img className="img-fluid" src={this.state.product.img}/>
                        </div>
                        <div className="col-9">
                          <p>{this.state.product.description}</p>
                          <p>Цена: {this.state.product.price}</p>
                          <hr/>
                          <button type="button" className="btn btn-primary">Заказать</button>
                          <br/><br/>
                        </div>
                      </div>
                    </ProductBox>
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