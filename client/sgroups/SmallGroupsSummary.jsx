import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import SmallGroupSingle from './SmallGroupSingle.jsx';
import SmallGroupsWorkspace from './SmallGroupsWorkspace.jsx';


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

    //creates a new event and opens event details in event workspace

    Meteor.call('addBlankSG', function(error, result){
      if(error){
        console.error(error.reason);
        return;
      }

      location.assign("/sg/workspace/"+result);

    });

  }


  SGs(){
    // pulls upcoming, published events
    return Groups.find({type: "SG", active: true}).fetch();
  }


	render() {
    
		return (
      <div>
				<h1>Small Groups Dashboard</h1>
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
