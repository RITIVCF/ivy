import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import InfoBar from '../InfoBar.jsx';
import SubHeader from '../layouts/SubHeader.jsx';
import LoaderCircle from '../LoaderCircle.jsx';
import NoPerm from '../NoPerm.jsx';
import MainBox from '../MainBox.jsx';

import ChurchesSummary from './ChurchesSummary.jsx';
import ChurchWorkspace from './ChurchesWorkspace.jsx';
import NewChurchModal from './NewChurchModal.jsx';
import ChurchPreview from './ChurchPreview.jsx';


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

  openNew(){
    this.refs.modal.open();
  }

  getSubHeader(){
    var left = <ul className="left" key={1} >
      <li onClick={this.openNew.bind(this)}><a>
        <i className="material-icons black-text">add</i></a></li>
    </ul>;
    var right = <ul className="right" key={2} >
      <li onClick={this.toggleInfoBar.bind(this)}><a>
        <i className="material-icons black-text">{Meteor.user().preferences.churches_infobar?"info":"info_outline"}</i></a></li>
    </ul>
    return [left,right]
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
        content={[<ChurchesSummary key={1} />,
          <NewChurchModal ref="modal" key={2} />]}
        subheader={this.getSubHeader()}
        showinfobar={Meteor.user().preferences.churches_infobar}
        infobar={<ChurchPreview ch={new Church(Churches.findOne(Session.get("chselected")))} />}
        />
  )
	}
}
