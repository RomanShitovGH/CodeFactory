import React from "react";
import Nav from "../components/Navigation.jsx";
import ProductBox from "../components/ProductBox.jsx";
import { Link } from "react-router-dom";

export default class ProductPage extends React.Component {
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
                    <ProductBox title="ПВУ Turkov ZENIT 350 HECO">
                      <Nav tabs={[ "Описание", "Характеристики", "Отзывы" ]} className="nav nav-tabs"/>
                      <div className="row">
                        <div className="col-3">
                          <img className="img-fluid" src="https://www.codery.school/content/course/lesson3-task-img.png"/>
                        </div>
                        <div className="col-9">
                          <p>Вентеляционная установка с рекуперацией тепла и влаги в легком и универсальном корпусе из вспененного полипропилена предназначена для поддержания климата в жилых помещениях, или небольших офисах, магазинах.</p>
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