import React from "react";
import Nav from "../components/Navigation.jsx";

export default class Header extends React.Component {
    constructor(props) {
        super(props)
      }
  
    render() {
        const fon = "navbar navbar-expand navbar-dark " +  this.props.color ;
        return ( 
            <header className={ this.props.color }>
                <div className="row">
                <div className="col-md-8 offset-md-2 col-sm-10 offset-sm-1">
                    <nav className= { fon }>
                    <div className="collapse navbar-collapse">
                        <Nav tabs={[ "Каталог", "Доставка", "Гарантии", "Контакты" ]} className="navbar-nav"/>  
                    </div>
                    </nav>
                </div>
                </div>
            </header>
        )
    }
}