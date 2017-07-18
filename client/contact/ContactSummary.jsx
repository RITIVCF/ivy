import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import ContactSingle from './ContactSingle.jsx';
import Checkbox from './Checkbox.jsx';
import { getUsers } from '/lib/users.js';


export default class ContactSummary extends TrackerReact(React.Component) {
  constructor() {
    super();

    this.state = {
      statuses: ["Contact", "Crowd","Visitor","Member","Server","Leader","Multiplier"],
      filter: "",
      num: 10
    };

    if(Session.get("contactstatusfilter")===undefined){
      Session.set("contactstatusfilter",this.state.statuses);
    }


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

  newContact(event){
		event.preventDefault();
    FlowRouter.go("/forms/contacts/new");
  }

  changeFilter(){
    let text = this.refs.filter.value;
    text = text.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
    this.setState({filter: text});
	}

  export(){
		let contacts = this.contacts();
    exportUsersToCSV(contacts);
  }


  contacts(){
    var query= {status: {$in: Session.get("contactstatusfilter")}};
    query.status = {$in: ["Present", "Absent"]};
    let options = {sort: {name: 1}, limit: this.state.num};
    if(this.state.filter!=""){
      query.name={ $regex : this.state.filter, $options : 'i'};
    }
		Funnel.find().fetch();
    return getUsers(query, options);
  }

  select(id){
    this.setState({selected: id});
  }

  handleCheck(id){
    var array = Session.get("contactstatusfilter");
    console.log(array);
    if(array.includes(id)){
        array.splice(array.indexOf(id), 1);
    }else{
        array.push(id);
    }
    Session.set("contactstatusfilter", array);
  }

  unselect(){
    Session.set("conselected","");
  }


	render() {
    let perm = this.props.perm;
    let statuses = Session.get("contactstatusfilter");
		return (
      <div className="row" onClick={this.unselect.bind(this)} style={{height: "100%"}}>
        <div className="card">
          <div className="card-content">
            <div className="row">
              <div className="col s12 m7 l7">

								<p>Status Filter:
									{this.state.statuses.map((status)=>{
										return <Checkbox key={status}
											label={status}
											onChange={this.handleCheck.bind(this, status)}
											checked={statuses.includes(status)} />
									})}
								</p>

							</div>
              <div className="input-field col s12 m5 l5">
                <input ref="filter" onChange={this.changeFilter.bind(this)} type="text" className="validate" />
                <label htmlFor="icon_prefix">Search</label>
              </div>
            </div>
          </div>
        </div>

				<div className="row" id="scrollbox">
					{Meteor.user().preferences.contacts_view=="Tile"?this.contacts().map( (contact, i) => {
						return <ContactSingle key={contact._id} row={false} contact={contact}
							selected={Session.get("conselected")==contact._id} perm={perm}
							select={this.select.bind(this)} parent={this}/>
					}):
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
								{this.contacts().map( (contact)=>{
									return <ContactSingle key={contact._id} row={true} contact={contact}
										selected={Session.get("conselected")==contact._id} perm={perm}
										select={this.select.bind(this)} parent={this}/>
								})}
							</tbody>
						</table>
					</div>
					}
				</div>
			</div>
  )
	}
}
