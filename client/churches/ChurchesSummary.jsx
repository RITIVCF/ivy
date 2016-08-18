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
        options: Meteor.subscribe("allOptions")
      }
    };
  }

  componentWillUnmount() {
    this.state.subscription.Churches.stop();
  }

  createNew(event){
    event.preventDefault();
    console.log(event);
    console.log(this);
    //creates a new event and opens event details in event workspace
    console.log("This button creates a new church");
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
    Meteor.call('addBlankChurch');
  }


  churches(){
    // pulls upcoming, published events
    return Churches.find({active: true}).fetch();
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
      <div>
        <div className="row">
          <div className="col-sm-3 col-lg-2">
            <nav className="navbar navbar-default navbar-fixed-side">
              <div className="col-sm-12">
                <div class="btn-group btn-group-justified" role="group" aria-label="...">
                  <div class="btn-group" role="group">
                    <button type="button" className="btn btn-primary" onClick={this.createNew.bind(this)}>New</button>
                  </div>
                </div>
              </div>
            </nav>
          </div>
          <div className="col-sm-9 col-lg-10">
            <h1>Churches Dashboard</h1>
            <div className="panel panel-default">
              <div className="panel-body">
                <h2>Active Churches</h2>
                {this.churches().map( (church)=>{
                    return <ChurchSingle key={church._id} church={church} parent={this} />
                })}
                <h2>Old/Inactive Churches</h2>
                  {this.oldchurches().map( (church)=>{
                      return <ChurchSingle key={church._id} church={church} parent={this} />
                  })}
              </div>
            </div>
          </div>
        </div>
      {/*<a href="/churches/old"><button>View old/inactive churches</button></a>  */}
    </div>
  )
	}
}
