import React, {Component} from 'react';
import PreviewEvent from './components/PreviewEvent.jsx';
import FunnelTable from '../admin/overview/FunnelTable.jsx';
import FunnelChart from '../admin/overview/FunnelChart.jsx';
import FunnelChartMembership from '../admin/overview/FunnelChartMembership.jsx';
import { Contact } from '/lib/classes/Contact.js';

export default class ContactPreview extends Component {
  constructor() {
    super();

    this.state = {
      selected: ""
    }

  }

  getContact(){
    return new Contact(Meteor.users.findOne(this.props.cid));
  }

  contactsCount(){
    return Meteor.users.find({},{fields: {name: 1}}).fetch().length;
  }


  componentDidUpdate(){
    $('ul.tabs').tabs();
  }

  componentDidMount(){
    $('ul.tabs').tabs();
  }

  getEvents(){
    return Events.find({"attendees._id":this.props.cid}, {sort:{start:-1}}).fetch();
  }

  select(id){
    this.setState({selected: id});
  }


  render(){
    var attendance = checkPermission('attendance');
    if(!this.props.cid){
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
    let contact = this.getContact();
    return (
      <div className="row">
        <div className="col s12">
          <h4>{contact.getName()}</h4>
          <ul className="tabs z-depth-1">
            <li className={attendance?"tab col s6":"tab col s12"}><a href="#quick_view">General</a></li>
            {attendance?<li className="tab col s6"><a href="#quick_events">Events</a></li>:""}
          </ul>
        </div>
        <div id="quick_view" className="col s12">
          <div className="card">
            <div className="card-content">
              <p><b>Name:</b> <br/>{contact.getName()}</p><br/>
              <p><b>Email:</b> <br/>{contact.getEmail()}</p><br/>
              <p><b>Phone:</b> <br/>{contact.getPhone()}</p><br/>
              <p><b>Newsletter:</b> <br/>{contact.getNewsletter()?"Yes":"No"}</p><br/>
              <p><b>Major:</b> <br/>{contact.getMajor()}</p>
            </div>
          </div>
        </div>
        {attendance&&<div id="quick_events" className="col s12">
            {this.getEvents().length>0?this.getEvents().map((event)=>{
              return <PreviewEvent key={event._id}
                event={event}
                select={this.select.bind(this)}
                selected={this.state.selected==event._id} />
            }):<p>No attended events.</p>}
          </div>
        }
      </div>
    )
  }
}
