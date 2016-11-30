import React, {Component} from 'react';
import PreviewEvent from './components/PreviewEvent.jsx';
import FunnelChart from '../admin/overview/FunnelChart.jsx';
import FunnelChartLimited from '../admin/overview/FunnelChartLimited.jsx';

export default class ContactPreview extends Component {
  constructor() {
    super();

    this.state = {
      selected: ""
    }

  }

  getContact(){
    return Contacts.findOne(this.props.cid);
  }

  contactsCount(){
    return Contacts.find({},{fields: {name: 1}}).fetch().length;
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

          {checkPermission("admin")?<ul><FunnelChart />
        <FunnelChartLimited /></ul>:<ul><p>Total:{this.contactsCount()}</p></ul>}
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
              <p>Name: <br/>{contact.name}</p><br/>
              <p>Email: <br/>{contact.email}</p><br/>
              <p>Phone: <br/>{contact.phone?contact.phone:"Not set"}</p><br/>
              <p>Newsletter: <br/>{contact.newsletter?"Yes":"No"}</p><br/>
              <p>Major: <br/>{contact.major?contact.major:"Not set"}</p>
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
