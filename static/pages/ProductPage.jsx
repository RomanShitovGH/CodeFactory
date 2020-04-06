import React from "react";
import Nav from "../components/Navigation.jsx";
import ProductBox from "../components/ProductBox.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { Link } from "react-router-dom";

export default class ProductPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      product: [],
      status: "idle"  
    }
  }
  
  componentDidMount() {
    console.log('До сюда дошел');
    fetch("/api/product?key="+this.props.match.params.product)
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
                <p>Цена: {this.state.product.price}</p>
                <hr/>
                <button type="button" className="btn btn-primary">Заказать</button>
                <br/><br/>
              </div>
            </div>
          </ProductBox> 
        )
      } 
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
       		    <Header color="bg-primary"/>
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
                    { this.renderStatus() }
                    { this.renderProduct() }
                  </div>
                </div>
              </main>
              <Footer/>
           	</div>
  }
}