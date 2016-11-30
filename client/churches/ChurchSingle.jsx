import React, {Component} from 'react';
import ButtonActive from './components/ButtonActive.jsx';
import ChurchWorkspace from './ChurchesWorkspace.jsx';

export default class ChurchSingle extends Component {
  constructor() {
    super();
    // this.state = {
    //   editting: false
    // };
  }

  edit(event){
    event.stopPropagation();
    Session.set("chselected",this.props.church._id);
  }

  render() {

    return (
      <div className="col s12 m6 l4">
        <div className={this.props.selected?
                        this.props.church.active?
                        "card left hoverable addBorderToCard":"card left grey hoverable addBorderToCard"
                        :
                        this.props.church.active?
                        "card left hoverable"
                        :"card grey left hoverable"}
          onClick={this.edit.bind(this)}>
          <div className="card-image">
            <img
              src={"/images/defaultChurch.png"} style={{width: "100%"}} />
          </div>
          <div className="card-content">
            <span className="card-title">{this.props.church.name}</span>
            {/*}<p className="truncate">{this.props.church.url}</p>*/}
          </div>
        </div>
      </div>
    )
  }
}
