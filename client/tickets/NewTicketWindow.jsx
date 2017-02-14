import React, { Component, PropTypes } from 'react';
import SelectUser from '../sharedcomponents/SelectUser.jsx';
import SelectOption from '../sharedcomponents/SelectOption.jsx';




export default class NewTicketWindow extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
          regarding: ""
        };
    }

    open(){
      $('#newticketmodal').appendTo('body').modal('open');
    }

    componentDidMount(){
      $('.modal').modal();
      $('select').material_select();
    }

    updateRegardU(user){
      this.setState({regarding: user});
    }

    unset(){
      // does nothing
    }

    createNew(){
      Meteor.call("addTicket",
      this.refs.subj.value,
      this.refs.desc.value,
      "",
      "",
      this.state.regarding._id?this.state.regarding._id:"",
      "Other", function(error, result){
        if(error){
          window.alert("Something went wrong. Send this to your tech guys.\n\n"+error);
        }else{
          FlowRouter.go("/tickets/"+result);
        }
      }
      );

      this.refs.subj.value="";
      this.refs.desc.value="";
      this.refs.cust.state.value="";
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
              <div className="row">
                <div className="input-field col s12">
                  <input ref="subj" id="subject" type="text" required />
                  <label htmlFor="subject">Subject</label>
                </div>
                <div className="input-field col s12">
                  <textarea ref="desc" className="materialize-textarea" id="desc" rows="4" />
                  <label htmlFor="desc">Description</label>
                </div>
                <div className="col s12">
                  <SelectUser parent={this}
                    unset={this.unset.bind(this)}
                    label="Regarding/For"
                    updateUser={this.updateRegardU.bind(this)}
                    ref="cust"  />
                </div>
              </div>
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
