import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import ChurchSingle from './ChurchSingle.jsx';
import ChurchWorkspace from './ChurchesWorkspace.jsx';

// Instead of event "types" it needs to be event "tags"
//Events = new Mongo.Collection("events");
//Churches = new Mongo.Collection("churches");

export default class ChurchesSummary extends TrackerReact(React.Component) {
  constructor() {
    super();

    this.state = {
      subscription: {
        Churches: Meteor.subscribe("allChurches"),
        Contacts: Meteor.subscribe("allContacts","All", "Name"),
        options: Meteor.subscribe("allOptions")
      }
    };
  }

  componentWillUnmount() {
    this.state.subscription.Churches.stop();
  }

  createNew(event){
    event.preventDefault();
    //console.log(event);
    //console.log(this);
    //creates a new event and opens event details in event workspace
    //console.log("This button creates a new church");
    /*Meteor.call('addBlankChurch', function(error, result){
      if(error){
        console.log(error.reason);
        return;
      }
      console.log("Church ID: " + result);
      console.log(this);
      location.assign("/churches/workspace/"+result);
      //this.Session.set("eventId",result);
      //location.assign("/events");

      //this.props.parent.state.eventId = result;
      //setID(result);
    });
    */
    Meteor.call('addChurch', this.refs.name.value);
    this.refs.name.value="";
  }


  churches(){
    // pulls upcoming, published events
    return Churches.find({},{sort: {active: -1}}).fetch();
  }

  oldchurches(){
    return Churches.find({active: false}).fetch();
  }


	render() {
    document.title="Ivy - Churches Dashboard";
    if(!checkPermission("churches")){
			return <div>Sorry. It looks like you don't have permission to view this page. Please check with your leadership team to get access.</div>
		}
		return (

      <div className="container">
        <div className="row">
          <div className="col s12 m8 l8">
            <h1>Churches</h1>
          </div>
          <div className="input-field col s12 m4 l4">
            <form onSubmit={this.createNew.bind(this)}>
              <input ref="name"  type="text" />
              <label htmlFor="icon_prefix">New Church Name</label>
            </form>
          </div>
        </div>
        <div className="divider"></div>
        <div className="row">
          {this.churches().map( (church)=>{
              return <ChurchSingle key={church._id} church={church} parent={this} />
          })}
        </div>
      </div>
  )
	}
}
