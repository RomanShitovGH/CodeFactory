import React from "react";
import Nav from "../components/Navigation.jsx";
import { Link } from "react-router-dom";
import { createBrowserHistory } from "history";
const history = createBrowserHistory();
const fetch = require("node-fetch");

export default class IndexPage extends React.Component {
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
        console.log("это THIS " + this.props);
        ;
      }.bind(this))
  }
  
  // renderProducts() {
  //   return  <div class="card-deck">
  //             <div class="card">
  //               <img class="card-img-top" src="https://www.codery.school/content/course/lesson3-task-img.png" alt="Card image cap"/> 
  //               <div class="card-body">
  //                 <h5 class="card-title">Первый товар</h5>
  //                 <p class="card-text">Описание первого товара</p>
  //                 <p class="card-text">Цена: 1000</p>
  //                 <Link to="/product/12345-slug">Купить</Link>          
  //               </div>
  //             </div>
  //           </div>;
          
  //   // Или можно вернуть сразу массив компонентов
  //   // return this.state.products.map()
  // }
      
  render() {
    console.log("Сюда пришли"); 
    //const items = this.props.products[0].title;  //.map((item, index) => {
  	   //return <a className={ (index === this.state.activeIndex) ? "nav-item nav-link active" : "nav-item nav-link" } data-index={index} onClick={ this.onClickLink } href="#">{item}</a>
   // console.log("Это пункты " + items);   
    //});

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
                      <div class="card-deck">
                        <div class="card">
                          <img class="card-img-top" src="https://www.codery.school/content/course/lesson3-task-img.png" alt="Card image cap"/> 
                          <div class="card-body">
                            <h5 class="card-title">Первый товар</h5>
                            <p class="card-text">Описание первого товара</p>
                            <p class="card-text">Цена: 1000</p>
                            <Link to="/product/12345-slug">Купить</Link>          
                          </div>
                        </div>
                        <div class="card">
                          <img class="card-img-top" src="https://www.codery.school/content/course/lesson3-task-img.png" alt="Card image cap"/> 
                          <div class="card-body">
                            <h5 class="card-title">Второй товар</h5>
                            <p class="card-text">Описание второго товара</p>
                            <p class="card-text">Цена: 2000</p>
                            <Link to="/product/11111-slug">Купить</Link>          
                          </div>
                        </div>
                        <div class="card">
                          <img class="card-img-top" src="https://www.codery.school/content/course/lesson3-task-img.png" alt="Card image cap"/> 
                          <div class="card-body">
                            <h5 class="card-title">Третий товар</h5>
                            <p class="card-text">Описание третьего товара</p>
                            <p class="card-text">Цена: 3000</p>
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