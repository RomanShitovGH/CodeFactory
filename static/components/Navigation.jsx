import React from "react";

class Nav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeIndex: 0  
    }
  } 
  
  onClickLink = event => {
      this.setState({
        activeIndex: Number(event.target.getAttribute("data-index"))
      })
  }
  
  render() {
     const items = this.props.tabs.map((item, index) => {
  	   return <a className={ (index === this.state.activeIndex) ? "nav-item nav-link active" : "nav-item nav-link" } data-index={index} key={index} onClick={ this.onClickLink } href="#">{item}</a>
       
    });
   
  	return <div className={this.props.className}>
  	        {items}
           </div>
           
  }
}

export default Nav;