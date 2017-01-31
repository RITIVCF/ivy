import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import SelectUser from '../sharedcomponents/SelectUser.jsx';

export default class NewGroupModal extends TrackerReact(React.Component) {
  constructor(){
    super();
    var perms = PagePermissions.find().fetch()
    var permarray =[];
    perms.forEach((perm)=>{
      permarray.push(perm._id);
    });
    this.state = {
      selectvalue: "",
      createdisabled: true,
      allperms: permarray,
      availableperms: permarray,
      groupperms: [],
      users: [],
      leader: {name: ""}
    };
  }

  componentDidMount(){
    // Use Materialize custom select input
    //console.log(this.refs.type);
    //$(this.refs.type).materiasl_select(this.check.bind(this));
    //$('#newgrouptype').on('change', 'input', function(){this.check.bind(this)});
    //$('#subject_update select[name=type]').on('change',function(){console.log('select has changed to:',$(this).val());});
    //$(React.findDOMNode(this.refs.type)).on('change',this.check.bind(this));
  }

  open(){
    $("#newgroupmodal").appendTo("body").modal("open");
  }

  create(){
    // you can grab the page perm ids from 'this.state.groupperms' array
    console.log("Type: ", this.props.type);
    console.log("Leader: ", this.state.leader);
    if(this.props.type=="Team"||this.props.type=="Small Group"){
      var id = this.state.leader._id?this.state.leader._id:"";
    }
    else{
      var id= "";
    }

    Meteor.call("addGroup",
      this.refs.name.value,
      this.props.type,
      this.state.groupperms,
      this.state.users,
      id
    );
    this.refs.name.value="";
    this.setState({availableperms: this.state.allperms});
    this.setState({groupperms: []});
    this.setState({users: []});
    this.setState({leader: {name: ""}});
  }

  handleTypeChange(event){
    this.setState({selectvalue: event.target.value});
    this.check();
  }

  check(){
    console.log("Name Value: ", this.refs.name.value);
    console.log(this.props.type);
    if(this.refs.name.value==""){
          this.setState({createdisabled: true});
    }
    else{
      this.setState({createdisabled: false});
    }
  }

  getAvailablePerms(){
    return PagePermissions.find({_id: {$in: this.state.availableperms}}).fetch();
  }

  getGroupPerms(){
    return PagePermissions.find({_id: {$in: this.state.groupperms}}).fetch();
  }

  addPerm(){
    this.setState((prevState, props)=>{
      this.state.groupperms.push(this.refs.availableperms.value);
      return {groupperms: this.state.groupperms}
    });
    this.setState((prevState, props)=>{
      this.state.availableperms.splice(this.state.availableperms.indexOf(this.refs.availableperms.value),1);
      return {availableperms: this.state.availableperms}
    });
  }

  removePerm(){
    this.setState((prevState, props)=>{
      this.state.availableperms.push(this.refs.groupperms.value);
      return {availableperms: this.state.availableperms}
    });
    this.setState((prevState, props)=>{
      this.state.groupperms.splice(this.state.groupperms.indexOf(this.refs.groupperms.value),1);
      return {groupperms: this.state.groupperms}
    });
  }

  setLeader(user){
    this.setState({leader: user});
  }

  unsetLeader(){
    this.setState({leader: {name: ""}});
  }

  addUser(user){
    this.setState((prevState, props)=>{
      this.state.users.push(user._id);
      return {users: this.state.users}
    });
  }

  removeUser(event){
    // console.log(event.target.value);
    // console.log(event.target);
    var id = event.target.name;
    this.setState((prevState, props)=>{
      this.state.users.splice(this.state.users.indexOf(id),1);
      return {users: this.state.users}
    });
  }

  getUsers(){
    return Meteor.users.find({_id: {$in: this.state.users}});
  }


  render() {
    return (
      <div id="newgroupmodal" className="modal modal-fixed-footer">
        <div className="modal-content">
          <div className="row">
            <div className="input-field col s12 m6 l4">
              <input type="text" id="newgroupnameinput"
                ref="name"
                onChange={this.check.bind(this)} />
              <label htmlFor="newgroupnameinput">New Name*</label>
            </div>
          </div>
          <div className="row">
            <div className="col s12">
              <p>Group Permissions</p>
              <div className="col s12 m5">
                <select multiple ref="availableperms" className="browser-default">
                  {this.getAvailablePerms().map((perm)=>{
                    return <option key={perm._id} value={perm._id}>{perm.pagename}</option>
                  })}
                </select>
              </div>
              <div className="col s12 m1">
                <a className="btn" onClick={this.addPerm.bind(this)}>=></a>
                <a className="btn" onClick={this.removePerm.bind(this)}>{"<="}</a>
              </div>
              <div className="col s12 m5">
                <select multiple ref="groupperms" className="browser-default">
                  {this.getGroupPerms().map((perm)=>{
                    return <option key={perm._id} value={perm._id}>{perm.pagename}</option>
                  })}
                </select>
              </div>
            </div>
          </div>
          {(this.props.type=="Small Group"||this.props.type=="Team")&&
            <div className="row">
              <div className="col s8">
                {/*}<p>Set leader:*</p>*/}
                <SelectUser
                  initialValue={this.state.leader.name}
                  id="leaderselect"
                  label="Set Leader:*"
                  keepName={true}
                  unset={this.unsetLeader.bind(this)}
        					updateUser={this.setLeader.bind(this)}
        					ref="leader" />
              </div>
            </div>}
          <div className="row">
            <div className="col s12">
              <p>Add users to the group:</p>
      				<SelectUser
      				initialValue={""}
      					updateUser={this.addUser.bind(this)}
                id="userselect"
      					ref="user" />
      				<table>
      					<thead>
      						<tr>
      							<th>Name</th>
      							<th>Email</th>
                    <th></th>
      						</tr>
      					</thead>
      					<tbody>
      						{this.getUsers().map((user)=>{
      							return <tr key={user._id}  id="showhim">
                      <td>{user.name}</td>
                      <td>{user.emails[0].address}</td>
                      <td><span className="material-icons"
                                id="showme"
                                name={user._id}
                                onClick={this.removeUser.bind(this)}>close
                        </span>
                      </td>
                    </tr>
      						})}
      					</tbody>
      				</table>
            </div>
          </div>
        </div>
        <div className="modal-footer">{/*buttons top to bottom go right to left */}
          <a className="modal-action modal-close waves-effect waves-green btn-flat">Close</a>
          <a className="modal-action modal-close waves-effect waves-green btn-flat"
            onClick={this.create.bind(this)}
            disabled={this.state.createdisabled} >Create</a>
        </div>
      </div>
    )
  }
}
