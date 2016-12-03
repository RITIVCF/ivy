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

  changeStatus(){
    Meteor.call("updateStatus", this.props.contact, this.refs.status.value);
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
    FlowRouter.go("/contacts/"+this.props.contact._id);
  }
  render() {
    // This area needs styled, so however we need to do it to style
    // it correctly. Review Alex's mock ups and Jeanie's drawings.-->
    if(this.props.row){
      return (
        <tr className={this.props.selected?"blue white-text":""}
          onClick={this.selectThis.bind(this)} onDoubleClick={this.go.bind(this)}>
          <td>{this.props.contact.name}</td>
          <td>{this.props.contact.email}</td>
          <td>{this.props.contact.phone}</td>
          <td>{this.props.contact.newsletter?"Yes":"No"}</td>
          <td>{checkPermission("admin") ? <select
              ref="status"
              className="browser-default"
              value={this.props.contact.status}
              onClick={this.openDropdown.bind(this)}
              onChange={this.changeStatus.bind(this)} >
            <option value="Crowd">Crowd</option>
            <option value="Visitor">Visitor</option>
            <option value="Member">Member</option>
            <option value="Server">Server</option>
            <option value="Leader">Leader</option>
            <option value="Multiplier">Multiplier</option>
          </select> : <p>{this.props.contact.status}</p>}</td>
        </tr>
      )
    }
    return (
      <div className="col s12 m6 l4">
      <div className={this.props.selected?"card left hoverable addBorderToCard":"card left hoverable"}
        onClick={this.selectThis.bind(this)} onDoubleClick={this.go.bind(this)}>
        <div className="card-image">
          <img src="/images/defaultPic.png" style={{width: "25%"}} className="circle responsive-img" />
        </div>
        <div className="card-content">
          <span className="card-title">{this.props.contact.name}</span>
        <p className="truncate">{this.props.contact.email}</p>
        <p>{this.props.contact.status}</p>
        {/*<p>{this.props.contact.status //this.props.contact.member ? "Member":"Contact"}</p> */}

        {this.props.perm?<p><button className="btn btn-primary" onClick={this.viewTicket.bind(this)}>View Ticket</button></p>:""}
      </div>
    </div>
    </div>

    )
  }
}
