import React from "react";
import Nav from "../components/Navigation.jsx";
import { Link } from "react-router-dom";
import { createBrowserHistory } from "history";
const history = createBrowserHistory();
const fetch = require("node-fetch");

export default class IndexPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      products: {}  
    }
  }
  
  componentDidMount(){
    console.log("Функция componentDidMount() начала выполняться");
    fetch("/api/products")
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        this.setState({
          products: json 
        })
        console.log(this.state.products);
        ;
      }.bind(this))
  }
  
   renderProducts() { 
      //console.log("зашло в renderProducts()");
      //if (!this.state.products) { return false; } 
      //console.log(this.state.products);
      this.state.products.map(product => {
        return (
          <div className="card">
            бла бла бла
            <img className="card-img-top" src="https://www.codery.school/content/course/lesson3-task-img.png" alt="Card image cap"/> 
            <div className="card-body">
              <h5 className="card-title">{product.title}</h5>
              <p className="card-text">Описание первого товара</p>
              <p className="card-text">Цена: 1000</p>
              <Link to="/product/12345-slug">Купить</Link>          
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
                      <div className="card-deck">
                      { 
                          this.state.products
                            ? this.renderProducts() 
                            : false
                        }
                        <div className="card">
                          <img className="card-img-top" src="https://www.codery.school/content/course/lesson3-task-img.png" alt="Card image cap"/> 
                          <div className="card-body">
                            <h5 className="card-title">Первый товар</h5>
                            <p className="card-text">Описание первого товара</p>
                            <p className="card-text">Цена: 1000</p>
                            <Link to="/product/12345-slug">Купить</Link>          
                          </div>
                        </div>
                        <div className="card">
                          <img className="card-img-top" src="https://www.codery.school/content/course/lesson3-task-img.png" alt="Card image cap"/> 
                          <div className="card-body">
                            <h5 className="card-title">Второй товар</h5>
                            <p className="card-text">Описание второго товара</p>
                            <p className="card-text">Цена: 2000</p>
                            <Link to="/product/11111-slug">Купить</Link>          
                          </div>
                        </div>
                        <div className="card">
                          <img className="card-img-top" src="https://www.codery.school/content/course/lesson3-task-img.png" alt="Card image cap"/> 
                          <div className="card-body">
                            <h5 className="card-title">Третий товар</h5>
                            <p className="card-text">Описание третьего товара</p>
                            <p className="card-text">Цена: 3000</p>
                            <Link to="/product/22222-slug">Купить</Link>          
                          </div>
                        </div>
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