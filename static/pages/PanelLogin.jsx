import React from "react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { Link } from "react-router-dom";
const Cookie = require('cookie');
const jwt = require('jsonwebtoken');


export default class PanelLogin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      status: "idle",
      credentials: {
        login: '',
        password: ''
      }  
    }
  }
  
  componentDidMount() {
    try {
      if (document.cookie) {
        const cookies = Cookie.parse(document.cookie);
        const payload = jwt.decode(cookies.token)
        const timestampInSeconds = new Date().getTime();
        if (timestampInSeconds > payload.exp * 1000) {
          this.setState({
            status: "pending"
          })
        } else {
          this.setState({
            status: "logged"
          })
        }  
      } else {
        this.setState({
          status: "pending"
        })
      }
    } catch(error) {
      this.setState({
        status: "error"
      })
      console.log("Ошибка - " + error);
    }  
  }
  
  onChange (event) {
    const name = event.target.name;
    const prod = this.state.credentials;
    prod[name] = event.target.value;
    this.setState({ credentials: prod });
  }

  onLogin (event) {
    event.preventDefault();
    fetch(`/api/login`, {
      method: "post",
      body: JSON.stringify(this.state.credentials),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => { 
        if (response.status === 200) {
          this.setState({
            status: "logged"
          })  
        } else {
            throw new Error('Получена ошибка с кодом - ' + response.status);
        }    
      })
      .catch(error => {
        console.log("Ошибка - " + error);
        this.setState({
          status: "error"
        })
      }) 
  }
  
  onLogout (event) {
    event.preventDefault();
    document.cookie = 'token=; Path=/; Max-Age=0;';
    this.setState({
      status: "pending"
    });


  }

  renderFormLogin() {
    return (
      <form>
        <label>Авторизация</label>
        <div className="form-group">
          <label>Логин: </label>
          <input  
            name="login"             
            type="text" 
            value={ this.state.credentials.login }
            onChange={ this.onChange.bind(this) } />
          <br/>
          <label>Пароль: </label>
          <input  
            name="password"             
            type="password" value={ this.state.credentials.password } 
            onChange={ this.onChange.bind(this) }/>
          <br/>
        </div>
        <button type="button" className="btn btn-primary" onClick={ this.onLogin.bind(this) }>Войти</button>
      </form>
    )
  }  

  renderFormLogout() {
    return (
      <form>
        <button type="button" className="btn btn-primary" onClick={ this.onLogout.bind(this) }>Выйти</button>
      </form>
    )
  }

  renderStatus() {
    switch (this.state.status) {
      case "logged":
        return ( <div className="alert alert-primary" role="alert">
                 Вы успешно авторизированны
               </div> );
      case "error":
        return ( <div className="alert alert-danger" role="alert">
                 Не верна пара Логин/Пароль
               </div> );
      case "pending":
        return ( <div className="alert alert-warning" role="alert">
                 Необходимо авторизоваться
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
                    { this.state.status !== "logged" ? this.renderFormLogin() : this.renderFormLogout() }
                  </div>
                </div>
              </main>
              <Footer/>
           	</div>
  }
}