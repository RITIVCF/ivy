import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import ContactList from './ContactList.jsx';
import ContactFilter from './ContactFilter.jsx';
import { getUsers } from '/lib/users.js';


export default class ContactSummary extends TrackerReact(React.Component) {
  constructor() {
    super();

		if(Session.get("contactstatusfilter")===undefined){
      Session.set("contactstatusfilter",["Crowd","Visitor","Member","Server","Leader","Multiplier"]);
    }
		if(Session.get("contactstatusfiltertext")===undefined){
			Session.set("contactstatusfiltertext", "");
		}

  }

	render() {
    const statuses = Session.get("contactstatusfilter");
		const filter = Session.get("contactstatusfiltertext");
		return (
			<div>
				<ContactFilter />
				<ContactListContainer
					statuses={statuses}
					filter={filter}
				/>
			</div>
  	)
	}
}
