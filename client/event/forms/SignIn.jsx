import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import SelectContact from '../../sharedcomponents/SelectContact.jsx';
import HowHearSelect from './HowHearSelect.jsx';

export default class SignIn extends TrackerReact(React.Component){
  constructor(props) {
    super(props);

    this.state = {
      contact: false,
      new: true,
      submitted: false
    };
  }

  submit(event){
    event.preventDefault();
    var thiz = this;
    //console.log(this.state);
    var eid = this.props.ev._id;
    var contact = this.state.contact;
    var evname = this.props.ev.name;
    var name = this.refs.user.state.value;
    if(this.state.new){
        var newsletter = this.refs.newsletter.checked;
        var more = this.refs.learnmore.checked;
        if(this.refs.howhear.state.other){
          var howhear = this.refs.howhear.refs.other.value;
        }
        else{
          var howhear = this.refs.howhear.refs.howhear.value;
        }
    }

    if( !contact ){

      var id = Meteor.call("newContact",
        this.refs.user.state.value,
        this.refs.email.value,
        this.refs.phone.value,
        this.refs.major.value,
        howhear,
        function(error, cid){
          Meteor.call("addAttendanceTicket",
            "New Contact: "+ name,
            "New Contact at event: "+ evname,
            "","", cid,
            eid,
            function(errr, tktId){
              if(errr){
                //console.log(errr.reason);
                return;
              }
              Meteor.call("createAttendanceRecord",
              eid, cid,
              true,
              more,
              howhear,
              tktId);
              thiz.timer();
            });
            if(newsletter){
              Meteor.call("updateNewsletter", cid, true);
            }
        });

    }
    else{
      Meteor.call("createAttendanceRecord",
      this.props.ev._id,this.state.contact._id,
      false,
      "",
      "",
      "");
      thiz.timer();
      // if(this.refs.newsletter){
      //   Meteor.call("updateNewsletter", this.state.contact._id, true);
      // }
    }
    //this.props.parent.setState({id: this.props.parent.state.id + 1});
  //   this.forceUpdate();
  //   this.refs.email.value="";
  //   if(this.state.new){
  //     this.refs.phone.value="";
  //     this.refs.newsletter.checked=false;
  //     this.refs.major.value="";
  //   }
  //
  //   //this.state.new=false;
  //   this.setState({new: true});
  //   this.refs.user.state.value='';
  //   this.refs.user.forceUpdate();
  // //  this.refs.user.focus();
  }

  timer(){
    this.setState({submitted: true});
    var thiz = this;
    setTimeout(function(){
      thiz.setState({submitted: false});
      thiz.setState({contact: false});
      thiz.setState({new: true});
    }, 3000);
  }


  getContacts(){
    return Contacts.find().fetch();
  }

  update(contt){
    //console.log("Suggestion Selected. Print autosuggest return object.");
    //console.log(contt);
    //this.state.contact = contt;
    this.setState({contact: contt});
    //this.state.new = false;
    this.setState({new: false});
    //console.log("print state");
    //console.log(this.state);
    this.refs.email.value = contt.email;
    //this.refs.phone.value = this.state.contact.phone;
    //this.refs.newsletter.checked = this.state.contact.newsletter;
    //this.setState({contact:contt});
    ////console.log(this);
  }

  log(){
    //console.log(this.state);
  }

  setNew(){
    if(!this.state.contact){
      this.state.new = true;
    }
  }

  unset(){
    //console.log(this);
    //this.state.contact = false;
    this.setState({new: true});
    this.setState({contact: false});
    this.refs.email.value="";
    // this.refs.phone.value="";
    // this.refs.newsletter.checked=false;
    // this.refs.major.value="";
    //this.state.new=false;
    //this.clearFields.bind(this);
  }

  changeName(event){
    event.preventDefault();
    this.setState({name: event.target.value});
  }

  render() {
      return (
        <div className="valign" id="signinformcontainer">
          <div className="col s4">
            {!this.state.submitted?
            <div className="card-panel hoverable" id="cardwait">
              <div className="card-content">
                <h1>Welcome to {this.props.ev.name}!</h1>
                <h2>Please sign in</h2>
                <form className="publicForm" onSubmit={this.submit.bind(this)} name="form">
                  <div className="form-group">
                    <SelectContact
                      parent={this}
                      unset={this.unset.bind(this)}
                      onBlur={this.setNew.bind(this)}
                      initialValue={""}
                      onChange={this.changeName.bind(this)}
                      updateContact={this.update.bind(this)}
                      id="first_name"
                      type="text"
                      ref="user"
                      className="validate" />
                    <input ref="email" placeholder="Email" id="email" type="email" required />
                    {this.state.new?<div>
                      <input ref="phone" placeholder="Phone number (optional)" type="tel" />
                      <input ref="major" placeholder="Major (optional)" type="text" />
                      <HowHearSelect ref="howhear" />
                      <input type="checkbox" ref="newsletter" id="news" name="news"  value="Yes" />
                      <label htmlFor="news">Please sign me up for the newsletter</label>
                      <input type="checkbox" ref="learnmore" id="more" name="more" value="Yes" />
                      <label htmlFor="more">I would like to learn more about IV</label>
                      </div>:""}
                    <input type="submit" name="submit" value={this.state.new?"Sign In":"Welcome Back"} className="form-control button" />
                  </div>
                </form>
              </div>
            </div>
            :
            <div className="card" id="cardsubmit">
              <div className="card-content">
                <img className="logo" src={"/images/InterVarsity-RIT-logo.png"} />
                <br />
                <p style={{textAlign: "center"}}>Welcome to {this.props.ev.name}!</p>
                <p style={{textAlign: "center"}}>We're glad you're here!</p>
              </div>
            </div>}
          </div>
        </div>
      )

  }
}
