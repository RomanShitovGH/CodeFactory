import React from "react";

export default class Footer extends React.Component {
  render() {
    return ( 
        <footer className="bg-secondary">
            <div className="row">
                <div className="col-md-8 offset-md-2 col-sm-10 offset-sm-1 bg-secondary">
                    &copy; Codery.camp, 2020
                </div>
            </div>
        </footer>
    )
  }
}