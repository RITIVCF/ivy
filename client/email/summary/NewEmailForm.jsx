import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import SelectRecip from '../../sharedcomponents/SelectRecip.jsx';

export default class NewEmailForm extends TrackerReact(React.Component){
  constructor() {
    super();

    this.state = {
      to: {
        users: [],
        groups: [],
        emails: []
      }
    };


  }

  componentDidMount(){
    $('select').material_select();
  }

  componentWillUnmount() {

  }

  submit(event){
    event.preventDefault();
    //this.setState({})
    console.log(this.state);
    console.log(this.refs.template.value);
    let to = this.state.to;
    if(to.users.length>0||to.groups.length>0||to.emails.length>0){
      Meteor.call("newEmail",
        this.refs.template.value,
        this.refs.from.value,
        this.state.to, function(err, res){
					if(!!err){
						Materialize.toast("Something went wrong. Please try again.", 5000);
						console.error(err);
					} else{
						FlowRouter.go("/emails/workspace/"+res);
						$('#NewEmailFormModal').modal("close");
					}
        });
    }
    else{
      Materialize.toast("Please select at least one recipient to continue", 4000);
    }
  }

  addRecip(recip){
    if(recip.isUser){
      this.setState({"to.users": this.state.to.users.push(recip._id)});
    }
    else{
      this.setState({"to.groups": this.state.to.groups.push(recip._id)});
    }

  }

  addEmail(event){
    event.preventDefault();
    if(this.refs.recipselect.state.value==""){
      return;
    }
    this.setState({"to.emails": this.state.to.emails.push(this.refs.recipselect.state.value)});
  }

  getGroups(){
    return Groups.find({_id: {$in: this.state.to.groups}}).fetch();
  }

  getUsers(){
    return Meteor.users.find({_id: {$in: this.state.to.users}}).fetch();
  }

  getTemplates(){
    return Emails.find({isTemplate: true}).fetch();
  }

  changeTemplate(event){
    this.setState({to: Emails.findOne(event.target.value).to});
  }

  getFrom(){
    var emails= [];
    Meteor.user().emails.forEach((email)=>{
      emails.push(email.address);
    });
    if(checkPermission("ivrep")){
      emails.push("ivcf@rit.edu");
    }
    if(checkPermission("sysadmin")){
      emails.push("ivy@rit.edu");
    }
    return emails;
  }

  render() {
    let to = this.state.to;
    return (
      <div className="row">
          <form onSubmit={this.addEmail.bind(this)}>
            <h5>New Email</h5>
            <div className="input-field col s12">
              <select ref="template" className="" value="" onChange={this.changeTemplate.bind(this)}>
                {/*}<option value="" disabled>Select template</option>*/}
                {this.getTemplates().map((temp)=>{
                  return <option key={temp._id} value={temp._id}>{temp.title}</option>
                })}
              </select>
              <label>Select Email Template: </label>
            </div>
            <div className="input-field col s12">
              <select ref="from" className="" value="" disabled={this.getFrom().length<=1}>
                {this.getFrom().map((email)=>{
                  return <option key={email} value={email}>{email}</option>
                })}
              </select>
              <label>Select From Email: </label>
            </div>
            <div className="col s12">
                <SelectRecip
                  initialValue={""}
                  label={"Recipient Name/Email"}
                  updateRecip={this.addRecip.bind(this)}
                  onSubmit={this.addEmail.bind(this)}
                  id="recipselect"
                  ref="recipselect" />
              </div>
            {/*}<div className="input-field col s12">
              <input id="emailrecip" type="text" ref="recip" />
              <label htmlFor="emailrecip">Search Recipients</label>
            </div>*/}

            <ul className="collection">
              {this.getGroups().map((group)=>{
                return <li key={group._id} className="collection-item"><div>{group.name}<a className="secondary-content"><i className="material-icons">group</i></a></div></li>
              })}
              {this.getUsers().map((user)=>{
                return <li key={user._id} className="collection-item"><div>{user.name}<a className="secondary-content"><i className="material-icons">person</i></a></div></li>
              })}
              {to.emails.map((email)=>{
                return <li key={email} className="collection-item"><div>{email}<a className="secondary-content"><i className="material-icons">email</i></a></div></li>
              })}
              {(to.users.length==0&&to.groups.length==0&&to.emails.length==0)&&
                <li className="collection-item">No Recipients</li>}
            </ul>
            <input type="submit" style={{border: "0",padding:"0",fontSize: "0"}} />
            </form>
            <button onClick={this.submit.bind(this)} className="btn-floating btn-large iv-blue waves-effect waves-light right">
              <i className="material-icons">send</i>
            </button>
      </div>
    )
  }
}
