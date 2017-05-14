import React, {Component} from 'react';

export default class ContactSingle extends Component {
  constructor(){
    super();
    this.state = {

    };
  }

  viewTicket(){
    FlowRouter.go("/tickets/"+this.props.contact.ticket);
  }

  openDropdown(event){
    event.stopPropagation();
  }

  selectThis(event){
    event.stopPropagation();
    //this.props.select(this.props.contact._id);
    if(Session.get("conselected")==this.props.contact._id){
      Session.set("conselected","");
    }
    else{
      Session.set("conselected", this.props.contact._id);
    }
  }

  go(){
    FlowRouter.go("/people/"+this.props.contact._id);
  }

  render() {
    let contact = this.props.contact;
    if(this.props.row){
      return (
        <tr className={this.props.selected?"blue white-text":""}
          onClick={this.selectThis.bind(this)} onDoubleClick={this.go.bind(this)}>
          <td>{contact.getName()}</td>
          <td>{contact.getEmail()}</td>
          <td>{contact.getPhone()}</td>
          <td>{contact.isSignedUpForNewsletter()}</td>
          <td>{contact.getStatus()}</td>
        </tr>
      )
    }
    return (
      <div className="col s12 m6 l4">
      <div className={this.props.selected?"card left addBorderToCard":"card left "}
        onClick={this.selectThis.bind(this)} onDoubleClick={this.go.bind(this)}>
        <div className="card-image">
          <img src="/images/defaultPic.png" style={{width: "25%"}} className="circle responsive-img" />
        </div>
        <div className="card-content">
          <span className="card-title">{contact.getName()}</span>
        <p className="truncate">{contact.getEmail()}</p>
        <p>{contact.getStatus()}</p>
        {/*<p>{contact.status //contact.member ? "Member":"Contact"}</p> */}

        {this.props.perm?<p>
          <button className="btn"  onClick={this.viewTicket.bind(this)}>View Ticket</button>
        </p>:""}
      </div>
    </div>
    </div>

    )
  }
}
