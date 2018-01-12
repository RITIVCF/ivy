import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import LoaderCircle from '/client/LoaderCircle';
import NoPerm from '/client/NoPerm.jsx';
import SelectUser from '/client/sharedcomponents/SelectUser';


export default class PrayerGroupPortal extends TrackerReact(React.Component) {

  constructor() {
    super();

    this.state ={
      subscription: {
        PrayerRequests: Meteor.subscribe("reportedPrayers"),
        PrayerGroup: Meteor.subscribe("prayerGroup")
      }
    };

    this.addToPrayerGroup = this.addToPrayerGroup.bind(this);

  }

  componentWillUmount(){
    this.state.subscription.PrayerRequests.stop();
    this.state.subscription.PrayerGroup.stop();
  }

  getReportedPrayers() {
    return PrayerRequests.find({ reported: true }).fetch();
  }

  getPrayerGroup() {
    let prayergroup = Groups.find({ _id: 'prayergroup' }).fetch();
    console.log(prayergroup.users);
    return Groups.find({ _id: 'prayergroup' }).fetch();
  }

  addToPrayerGroup(user){
		Meteor.call("addToPrayerGroup", {user});
  }

  render() {
    let ready=this.state.subscription.PrayerRequests.ready();
    let groupready=this.state.subscription.PrayerGroup.ready();
    if(!checkPermission("prayerportal")){
      return <NoPerm />
    }
    setDocumentTitle("Prayer Group Portal");
    return (
      <div>
        <div className="card">

          <div className="card-content">
            <div className="card-title">
              Prayer group members:
              <SelectUser
                initialValue={""}
                updateUser={this.addToPrayerGroup}
                id="prayergroupselect"
                ref="prayergroupselect" />
            </div>
            <ul className="collection">
              {groupready?this.getPrayerGroup().length!=0?this.getPrayerGroup().map((user)=>{
              return (
                <li className="collection-item">{user._id}</li>
              )
              }):<p style={{textAlign: "center"}}>No members of prayer group</p>:<LoaderCircle />}
            </ul>
          </div>

        </div>
        <div className="card">
          <div className="card-content">
            <span className="card-title">Reported posts:</span>
            <ul className="collection">
              {ready?this.getReportedPrayers().length!=0?this.getReportedPrayers().map((prayer)=>{
              return (
                <li className="collection-item">{prayer.content}</li>
              )
              }):<p style={{textAlign: "center"}}>No reported prayer requests</p>:<LoaderCircle />}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
