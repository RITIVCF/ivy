import React, { Component, PropTypes } from 'react';
import SelectContact from '../sharedcomponents/SelectContact.jsx';
import SelectOption from '../sharedcomponents/SelectOption.jsx';




export default class NewTicketWindow extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
          subscription: {
            users: Meteor.subscribe("allUsers"),
            contacts: Meteor.subscribe("allContacts")
          },
          overlayState: "hidden",
          eid: props.eid,
          assigned: "",
          regarding: ""
        };
    }

    componentWillUnmount(){
      this.state.subscription.users.stop();
      this.state.subscription.contacts.stop();
      //  addTicket(subj, desc, assg, assu, cust, typ)
    }


    toggleOverlay()
    {
        if(this.state.overlayState == "hidden")
        {
            this.setState({overlayState: ""});
        }
        else
        {
            this.setState({overlayState: "hidden"});
        }
    }

    openOverlay(){
      this.setState({overlayState:""});
    }

    updateAssignedU(user){
      this.state.assigned = user;
    }

    updateRegardU(user){
      this.state.regarding = user;
    }

    unset(){
      // does nothing
    }

    createClose(){
      this.setState({overlayState:"hidden"});
      console.log(this);
      if(!this.state.eid){
        Meteor.call("addTicket",
        this.refs.subj.value,
        this.refs.desc.value,
        "",
        this.state.assigned._id,
        this.state.regarding._id,
        this.refs.type.value
        );
      }
      else {
        Meteor.call("addEventRequest",
        this.refs.subj.value,
        this.refs.desc.value,
        "",
        "",
        "",
        this.state.eid,
        this.refs.type.value,
        );
      }
      this.refs.subj.value="";
      this.refs.desc.value="";
      this.refs.assigneduser.state.value="";
      this.refs.assigneduser.forceUpdate();
      this.refs.cust.state.value="";
      this.refs.cust.forceUpdate();
      this.refs.type.value="";
    //this.clearAll();
    }

    closeOverlay(){
      this.setState({overlayState:"hidden"});
      //this.clearAll();
    }

    clearAll(){
      this.refs.subj.value="";
      this.refs.desc.value="";
      this.refs.assigneduser.state.value="";
      this.refs.assigneduser.forceUpdate();
      this.refs.cust.state.value="";
      this.refs.cust.forceUpdate();
      this.refs.type.value="";
    }

    /*getEvent(){
  		//console.log(Events.find({_id: this.props.eid}).fetch());
  		//return Events.find({_id: this.props.eid}).fetch();
  		return Events.findOne(this.props.eid);
  	}*/

    getRequestTypes(){
      return Options.findOne({_id:"requesttypes"}).vals;
    }



    render()
    {
        return (
            <div>
              <div id="overlay" className={this.state.overlayState} onClick={this.closeOverlay.bind(this)}>
              </div>
              <div id="newEventPopup" className={this.state.overlayState}>
                <label>Subject<br/><input type="text" ref="subj" placeholder="Subject" required/></label>
                <br/>
                <label>Description<br/><textarea ref="desc" placeholder="Description" width={"100%"}/></label>
                <br/>
                {!this.props.eid ?
                  <label>Assigned User<br/>
                  <SelectContact parent={this}
                    unset={this.unset.bind(this)}
                    updateContact={this.updateAssignedU.bind(this)}
                    users={true}
                    ref="assigneduser"  />
                  </label>
                : ""}
                <br />
                {!this.props.eid ? <label>Regarding<br/>
                  <SelectContact parent={this}
                    unset={this.unset.bind(this)}
                    updateContact={this.updateRegardU.bind(this)}
                    users={true}
                    ref="cust"  />
                </label>
              :""}
                <br />
                {!this.props.eid ? <div></div>:<div>
                <p>If this is a request, select the type below. Otherwise, you can leave it blank.</p>
                <select ref="type">
                  <option value=""></option>
                    {this.getRequestTypes().map( (type)=>{
                        return <SelectOption key={type} value={type} displayvalue={type}  />
                    })}
                </select>
              </div>}
                <div id="btnsCreateCancel">
                  <button onClick={this.createClose.bind(this)}>Create</button>
                  <button onClick={this.closeOverlay.bind(this)}>Cancel</button>
                </div>
              </div>
            </div>
        );
    }
}
