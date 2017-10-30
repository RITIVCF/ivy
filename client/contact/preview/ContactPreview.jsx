import React, {Component} from 'react';
import PreviewEvent from '../components/PreviewEvent.jsx';
import LoaderCircle from '/client/LoaderCircle';

export default class ContactPreview extends Component {
  constructor() {
    super();

  }

  componentDidUpdate(){
    $('ul.tabs').tabs();
  }

  componentDidMount(){
    $('ul.tabs').tabs();
  }

  getEvents(){
    return Events.find(
			{"attendees._id": this.props.contact._id},
			{sort: {start:-1}}
		).fetch();
  }

  render(){
    const hasAttendancePermission = checkPermission('attendance');
    const { loading, contact } = this.props;
		if ( loading ) {
			return <LoaderCircle />;
		}
    return (
      <div className="row">
        <div className="col s12">
          <h4>{contact.getName()}</h4>
          <ul className="tabs z-depth-1">
            <li className={hasAttendancePermission?"tab col s6":"tab col s12"}><a href="#quick_view">General</a></li>
            {hasAttendancePermission?<li className="tab col s6"><a href="#quick_events">Events</a></li>:""}
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
        {hasAttendancePermission&&<div id="quick_events" className="col s12">
					{this.getEvents().length>0?this.getEvents().map((event)=>{
						return <PreviewEvent key={event._id} event={event} />
					}):<p>No attended events.</p>}
				</div>
        }
      </div>
    )
  }
}
