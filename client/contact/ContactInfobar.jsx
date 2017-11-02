import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import FunnelTable from '/client/admin/overview/FunnelTable.jsx';
import FunnelChart from '/client/admin/overview/FunnelChart.jsx';
import FunnelChartMembership from '/client/admin/overview/FunnelChartMembership.jsx';
import ContactPreviewContainer from './preview/ContactPreviewContainer';

export default class ContactInfobar extends TrackerReact(Component) {
  constructor() {
    super();

  }

  contactsCount(){
    return Meteor.users.find({},{fields: {name: 1}}).fetch().length;
  }

  render(){
		const cid = Session.get("conselected");
    if(!cid){
      return (
        <div>
          <h4>Summary</h4>
          {checkPermission("admin")?
            <ul>
              <FunnelChart  />
              <FunnelChartMembership />
              <FunnelTable />
            </ul>
					:<ul>
						<p>Total:{this.contactsCount()}</p>
					</ul>
          }
        </div>
      )
    }
    return (
      <ContactPreviewContainer cid={cid} />
    )
  }
}
