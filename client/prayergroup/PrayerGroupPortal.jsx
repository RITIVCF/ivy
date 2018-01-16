import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { getUsers } from '/lib/users.js';
import LoaderCircle from '/client/LoaderCircle';
import NoPerm from '/client/NoPerm.jsx';
import SelectUser from '/client/sharedcomponents/SelectUser';


export default class PrayerGroupPortal extends TrackerReact(React.Component) {

  constructor() {
    super();

    this.state ={
      subscription: {
        PrayerRequests: Meteor.subscribe("reportedPrayers"),
        PrayerGroup: Meteor.subscribe("prayerGroup"),
        AllContacts: Meteor.subscribe("allContacts")
      }
    };

    this.addToPrayerGroup = this.addToPrayerGroup.bind(this);
    this.getReportedPrayers = this.getReportedPrayers.bind(this)
    this.getPrayerGroup = this.getPrayerGroup.bind(this)
    this.deletePost = this.deletePost.bind(this)
    this.keepPost = this.keepPost.bind(this)
  }

  componentWillUmount(){
    this.state.subscription.PrayerRequests.stop();
    this.state.subscription.PrayerGroup.stop();
    this.state.subscription.AllContacts.stop();
  }

  getReportedPrayers() {
    return PrayerRequests.find({ reported: true }).fetch();
  }

  getPrayerGroup() {
    let group = Groups.findOne({ _id: 'prayergroup' });
    return getUsers({_id: {$in: group.users}});
  }

  deletePost(requestID) {
    if (window.confirm("This will delete the post forever")) {
      return Meteor.call("acceptPrayerRequestReport", { requestID })
    }
  }

  keepPost(requestID) {
    return Meteor.call("rejectPrayerRequestReport", { requestID })
  }

  removeUser(uid) {
    return Meteor.call("leavePrayerGroup", { uid })
  }

  addToPrayerGroup(user){
		Meteor.call("addToPrayerGroup", user._id);
  }

  render() {
    let ready=this.state.subscription.PrayerRequests.ready();
    let groupready=this.state.subscription.PrayerGroup.ready();
    if(!checkPermission("prayerportal")){
      return <NoPerm />
    }
    return (
      <div>
        <div className="card">
          <div className="card-content">
            <span className="card-title">Reported posts:</span>
            <ul className="collection">
              {ready?this.getReportedPrayers().length!=0?this.getReportedPrayers().map((prayer)=>{
                return (
                  <li key={prayer._id} className="collection-item">
                    {prayer.content}
                    <Button className="right" onClick={() => {this.deletePost(prayer._id)}}>
                      Delete post
                    </Button>
                    <Button className="right" onClick={() => {this.keepPost(prayer._id)}}>
                      Keep post
                    </Button>
                    <div style={{ clear: "both" }}></div>
                  </li>
                )
              }):<p style={{textAlign: "center"}}>No reported prayer requests</p>:<LoaderCircle />}
            </ul>
          </div>
        </div>
        <div className="card">

          <div className="card-content">
            <div className="card-title">
              Prayer group members:

            </div>
            <SelectUser
              initialValue={""}
              updateUser={this.addToPrayerGroup}
              id="userselect"
              ref="user" />
            <ul className="collection">
              {groupready?this.getPrayerGroup().length!=0?this.getPrayerGroup().map((user)=>{
              return (
                <li key={user._id} className="collection-item" style={{display: "flex"}}>
                  <div style={{flex: 1, alignSelf: 'center'}}>
                    {user.getName()} - {user.getEmail()}
                  </div>
                  <div style={{flex: 1}}>
                    <Button className="right" onClick={() => {this.removeUser(user._id)}}>
                      Remove
                    </Button>
                  </div>
                  <div style={{ clear: "both" }}></div>
                </li>
              )
              }):<p style={{textAlign: "center"}}>No members of prayer group</p>:<LoaderCircle />}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
