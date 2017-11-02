import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import LoaderCircle from '/client/LoaderCircle';

export default class ContactList extends TrackerReact(React.Component) {
  constructor() {
    super();

    this.state = {
      num: 10
    };

  }

  componentDidMount(){
    this.initializeInfiniteScroll();
  }

	initializeInfiniteScroll(){
		$("#mainbox").scroll(() => {
      var scrollboxHeight = $("#scrollbox").height();
      var mainboxscrollTop = $("#mainbox").scrollTop();

      if((scrollboxHeight-mainboxscrollTop) < $("#mainbox").height()) {
        this.setState({num: this.state.num+20});
      }

    });
	}

  unselect(){
    Session.set("conselected","");
  }

	render() {
		const { contacts, loading } = this.props;
		return (
      <div className="row" onClick={this.unselect.bind(this)} >

				<div className="row" id="scrollbox">
					{Meteor.user().preferences.contacts_view=="Tile"?
						this.renderTiles():
						this.renderTable()
					}
				</div>
				{loading&&<div style={{margin: "0 auto"}}><LoaderCircle /></div>}
				</div>
  	)
	}

	renderTiles(){
		return this.props.contacts.map( (contact, i) => {
			return (
				<ContactSingle key={contact._id} row={false} contact={contact}
					selected={Session.get("conselected")==contact._id} perm={this.props.perm}
					parent={this}
				/>
			)
		});
	}

	renderTable(){
		return (
			<div className="card">
				<table className="bordered highlight responsive-table" >
					<thead>
						<tr>
							<th>Name</th>
							<th>Email</th>
							<th>Phone</th>
							<th>Newsletter</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						{this.props.contacts.map( (contact)=>{
							return (
								<ContactSingle key={contact._id} row={true} contact={contact}
									selected={Session.get("conselected")==contact._id} perm={this.props.perm}
									parent={this}
								/>
							)
						})}
					</tbody>
				</table>
			</div>
		)
	}
}



class ContactSingle extends Component {
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
          <td>{contact.isSignedUpForNewsletter()?"Yes":"No"}</td>
          <td>{contact.getFunnelStatus()}</td>
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
						<p>{contact.getFunnelStatus()}</p>
						<p>{contact.isMember() ? "Member":"Contact"}</p>

						{this.props.perm?<p>
							<button className="btn"  onClick={this.viewTicket.bind(this)}>View Ticket</button>
						</p>:""}
					</div>
				</div>
			</div>
    )
  }
}
