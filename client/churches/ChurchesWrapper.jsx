import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import ChurchesSummary from './ChurchesSummary.jsx';
import ChurchWorkspace from './ChurchesWorkspace.jsx';
import InfoBar from '../InfoBar.jsx';
import SubHeader from '../layouts/SubHeader.jsx';
import LoaderCircle from '../LoaderCircle.jsx';
import NoPerm from '../NoPerm.jsx';
import MainBox from '../MainBox.jsx';

// Instead of event "types" it needs to be event "tags"
//Events = new Mongo.Collection("events");
//Churches = new Mongo.Collection("churches");

export default class ChurchesWrapper extends TrackerReact(React.Component) {
  constructor() {
    super();

    this.state = {
      subscription: {
        Churches: Meteor.subscribe("allChurches"),
        Contacts: Meteor.subscribe("allContacts","All", "Name")
      }
    };
  }

  componentWillUnmount() {
    this.state.subscription.Churches.stop();
  }

  toggleView(){
    Meteor.call("toggleChurchesView");
  }

  toggleInfoBar(){
    Meteor.call("toggleChurchesInfoBar");
  }

  getSubHeader(){
    return <div>
      {/*Meteor.user().preferences.churches_view=="Tile"?
        <li className="active" onClick={this.toggleView.bind(this)} ><a className="waves-effect waves-light">
          <i className="material-icons black-text">view_module</i></a></li>
        :<li className="active" onClick={this.toggleView.bind(this)}><a className="waves-effect waves-light">
        <i  className="material-icons black-text">view_list</i></a></li>*/}

      <li className="active" onClick={this.toggleInfoBar.bind(this)}><a className="waves-effect waves-light">
        <i className="material-icons black-text">{Meteor.user().preferences.churches_infobar?"info":"info_outline"}</i></a></li>
    </div>
  }


	render() {
    document.title="Ivy - Churches Dashboard";
    if(!(this.state.subscription.Churches.ready()&&this.state.subscription.Contacts.ready())){
      return <LoaderCircle />
    }
    if(!checkPermission("churches")){
      return <NoPerm />
		}
		return (
      <MainBox
        content={<ChurchesSummary />}
        subheader={this.getSubHeader()}
        showinfobar={Meteor.user().preferences.churches_infobar}
        infobar={<ChurchWorkspace ch={Churches.findOne(Session.get("chselected"))} />}
        />
  )
	}
}
