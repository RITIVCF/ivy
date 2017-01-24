import React, {Component} from 'react';
import PreviewEvent from './components/PreviewEvent.jsx';
import FunnelTable from '../admin/overview/FunnelTable.jsx';
import FunnelChartLimited from '../admin/overview/FunnelChartLimited.jsx';
import FunnelChartMembership from '../admin/overview/FunnelChartMembership.jsx';

export default class ContactPreview extends Component {
  constructor() {
    super();

    this.state = {
      selected: ""
    }

  }

  getContact(){
    return Meteor.users.findOne(this.props.cid);
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
    let contact = this.getContact();
    var attendance = checkPermission('attendance');
    if(!contact){
      return (
        <div>
          <h4>Summary</h4>

          {checkPermission("admin")?<ul>
            <FunnelChartLimited  />
            <FunnelChartMembership />
            <FunnelTable />
          </ul>:<ul><p>Total:{this.contactsCount()}</p></ul>}
        </div>
      )
    }
    return(
      <div className="row">
        <div className="col s12">
          <h4>{contact.name}</h4>
          <ul className="tabs z-depth-1">
            <li className={attendance?"tab col s6":"tab col s12"}><a href="#test1">General</a></li>
            {attendance?<li className="tab col s6"><a href="#test2">Events</a></li>:""}
          </ul>
        </div>
        <div id="test1" className="col s12">
          <div className="card">
            <div className="card-content">
              <p><b>Name:</b> <br/>{contact.name}</p><br/>
              <p><b>Email:</b> <br/>{contact.emails[0].address}</p><br/>
              <p><b>Phone:</b> <br/>{contact.phone?contact.phone:"Not set"}</p><br/>
              <p><b>Newsletter:</b> <br/>{contact.newsletter?"Yes":"No"}</p><br/>
              <p><b>Major:</b> <br/>{contact.major?contact.major:"Not set"}</p>
            </div>
          </div>
        </div>
        {attendance?<div id="test2" className="col s12">
          {this.getEvents().length>0?this.getEvents().map((event)=>{
            return <PreviewEvent key={event._id}
              event={event}
              select={this.select.bind(this)}
              selected={this.state.selected==event._id} />
          }):<p>No attended events.</p>}
        </div>:""}
      </div>
    )
  }
}
