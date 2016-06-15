import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import SmallGroupSingle from './SmallGroupSingle.jsx';
import SmallGroupsWorkspace from './SmallGroupsWorkspace.jsx';

// Instead of event "types" it needs to be event "tags"
//Events = new Mongo.Collection("events");
Groups = new Mongo.Collection("groups");

export default class SmallGroupsSummary extends TrackerReact(React.Component) {
  constructor() {
    super();

    this.state = {
      subscription: {
        SGs: Meteor.subscribe("allSGs")
      }
    };
  }

  componentWillUnmount() {
    this.state.subscription.SGs.stop();
  }

  createNew(event){
    event.preventDefault();
    console.log(event);
    console.log(this);
    //creates a new event and opens event details in event workspace
    console.log("This button creates a new SG");
    Meteor.call('addBlankSG', function(error, result){
      if(error){
        console.log(error.reason);
        return;
      }
      console.log("SG ID: " + result);
      console.log(this);
      location.assign("/sg/workspace/"+result);
      //this.Session.set("eventId",result);
      //location.assign("/events");

      //this.props.parent.state.eventId = result;
      //setID(result);
    });

  }


  SGs(){
    // pulls upcoming, published events
    return Groups.find({type: "SG", active: true}).fetch();
  }


	render() {
    document.title="Ivy - SG Summary Page";
		return (
      <div>
      <h1>SG Summary Page</h1>
      <div className="sidebar">
        <ul>
          <li><button onClick={this.createNew.bind(this)}>New</button></li>
        </ul>

      </div>
      <div className="summary">
        <div className="sgs">
          <h1>Active SGs</h1>
          {this.SGs().map( (sg)=>{
              return <SmallGroupSingle key={sg._id} sg={sg} parent={this} />
          })}
        </div>
      </div>
      <a href="/sg/old"><button>View old/inactive SGs</button></a>
    </div>
  )
	}
}
