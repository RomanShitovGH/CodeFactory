import React from "react";
import Nav from "../components/Navigation.jsx";
import Header from "../components/Header.jsx";
import ProductBox from "../components/ProductBox.jsx";
import Footer from "../components/Footer.jsx";
import { Link } from "react-router-dom";

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
  
//   componentDidMount() {
//     fetch(`/api/product?id=${this.props.match.params.id}`)
//       .then(response => { 
//         return response.json();  
//       })
//       .then(json => {
//         this.setState({
//           product: json,
//           status: "ready"  
//         })
        
//       })
//       .catch(error => {
//         this.setState({
//           status: "error"
//         })
//       })           
//   }
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
        console.log("response.status = " + response.status);
        if (response.status === 200) {
          this.setState({
            status: "ready"
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
  
  renderForm() {
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

  renderStatus() {
    switch (this.state.status) {
      case "ready":
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
                          <Link to="/panel/product">Каталог</Link>
                        </li>
                        <li className="breadcrumb-item"><a href="#">Вентиляция</a></li>
                        <li className="breadcrumb-item active" aria-current="page">ПВУ</li>
                      </ol>
                    </nav>
                    { this.renderStatus() }
                    { this.renderForm() }
                  </div>
                </div>
              </main>
              <Footer/>
           	</div>
  }
}