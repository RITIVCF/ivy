import React, { Component, PropTypes } from 'react';
import SelectUser from '../sharedcomponents/SelectUser.jsx';
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

    componentDidMount(){
      $('select').material_select();
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

    createNew(){
      this.setState({overlayState:"hidden"});
      //console.log(this);
      if(!this.state.eid){
        Meteor.call("addTicket",
        this.refs.subj.value,
        this.refs.desc.value,
        "",
        this.state.assigned._id?this.state.assigned._id:"",
        this.state.regarding._id?this.state.regarding._id:"",
        "" //this.refs.type.value
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
    //  this.refs.type.value="";
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


          <div id="newticketmodal" className="modal">
            <div className="modal-content">
              <div className="input-field col s12">
                <input ref="subj" id="subject" type="text" required />
                <label htmlFor="icon_prefix">Subject</label>
              </div>
              <div className="input-field col s12">
                <textarea ref="desc" rows="4" />
                <label htmlFor="icon_prefix">Description</label>
              </div>
              {!this.props.eid ?
                <label>Assigned User<br/>
                <SelectUser parent={this}
                  unset={this.unset.bind(this)}
                  updateContact={this.updateAssignedU.bind(this)}
                  intitialValue={""}
                  ref="assigneduser"  />
                </label>
              : ""}

              {!this.props.eid ? <label>Regarding<br/>
                <SelectUser parent={this}
                  unset={this.unset.bind(this)}
                  updateContact={this.updateRegardU.bind(this)}
                  intitialValue={""}
                  ref="cust"  />
              </label>
            :""}
              {!this.props.eid ? <div></div>:<div>
              <label>Type of Request</label>
              <div className="form-group">
                <select ref="type" className="form-control" >
                  <option value=""></option>
                    {this.getRequestTypes().map( (type)=>{
                        return <SelectOption key={type} value={type} displayvalue={type}  />
                    })}
                </select>
              </div>
            </div>}
            </div>
            <div className="modal-footer">
              <a onClick={this.createNew.bind(this)}
                className="modal-action modal-close waves-effect waves-green btn-flat">Submit
              </a>
              <a className="modal-action modal-close waves-effect waves-green btn-flat">Cancel
              </a>
            </div>
          </div>
        );
    }
}
