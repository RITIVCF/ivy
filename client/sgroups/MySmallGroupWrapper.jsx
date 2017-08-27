import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import MySmallGroup from './MySmallGroup.jsx';
import SmallGroupGatherings from './SmallGroupGatherings.jsx';
import SmallGroupMembers from './SmallGroupMembers.jsx';
import MainBox from '../MainBox.jsx';
import LoaderCircle from '../LoaderCircle.jsx';
import InfoBar from '../InfoBar.jsx';
import SubHeader from '../layouts/SubHeader.jsx';

export default class MySmallGroupWrapper extends TrackerReact(React.Component) {
  constructor() {
    super();

    this.state = {
      subscription: {
        mysg: Meteor.subscribe("MySG")
      },
      page: "Summary"
    }
  }

  componentWillUnmount() {

  }

  setPage(id){
    this.setState({page: id});
  }

  getSubHeader(){
    // Mailing list
    // Strategic Groups
    // Roles
    // Permission Groups
    // Small Groups
    return (
      <ul className="tabs">
        <li className="tab col s4">
          <a onClick={this.setPage.bind(this,"Summary")}
					className="active">{this.getSG().name}</a>
        </li>
        <li className="tab col s4">
          <a onClick={this.setPage.bind(this,"Gatherings")}
					className="">Upcoming Gatherings</a>
        </li>
        <li className="tab col s4">
          <a onClick={this.setPage.bind(this,"Members")}
					className="">Members</a>
        </li>
      </ul>)

  }

  getSG(){
    var grps = Groups.find({$or:[{leader: Meteor.userId()},{users: Meteor.userId()}], type:"Small Group"}).fetch();
    return grps[0];
  }


	render() {
    if(!this.state.subscription.mysg.ready()){
      return <LoaderCircle />
    }
    let sg = this.getSG();
    var isLeader = Meteor.userId()==sg.leader;
    if(this.state.page=="Summary"){
        var content = <MySmallGroup sg={sg} isLeader={isLeader}/>
    }
    if(this.state.page=="Gatherings"){
        var content = <SmallGroupGatherings sg={sg} isLeader={isLeader} />
    }
    if(this.state.page=="Members"){
        var content = <SmallGroupMembers sg={sg} isLeader={isLeader} />
    }
		return (
      <MainBox
        content={content}
        subheader={this.getSubHeader()}
        showinfobar={false}
        infobar={<div></div>}
			/>

    )
	}
}
