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
      leader: []
    };

		this.unsetLeader = this.unsetLeader.bind(this);
  }

  componentDidMount(){
  }

  open(){
    $("#newgroupmodal").appendTo("body").modal("open");
  }

  create(){
    // you can grab the page perm ids from 'this.state.groupperms' array

    Meteor.call("addGroup",
      this.refs.name.value,
      this.props.type,
      this.state.groupperms,
      this.state.users,
      this.state.leader
    );
    this.refs.name.value="";
    this.setState({availableperms: this.state.allperms});
    this.setState({groupperms: []});
    this.setState({users: []});
    this.setState({leader: []});
  }

  handleTypeChange(event){
    this.setState({selectvalue: event.target.value});
    this.check();
  }

  check(){
    if(this.refs.name.value=="" || this.state.leader.length==0){
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
		let leader = this.state.leader.slice();
		leader.push(user._id);
    this.setState({leader: leader},()=>{
      this.check();
    });
  }

  unsetLeader(id){
		let leader = this.state.leader.slice();
		leader.splice(leader.indexOf(id), 1);
		this.setState({leader: leader}, ()=>{
			this.check();
		});
  }

  getLeaders(){
    return Meteor.users.find({_id: {$in: this.state.leader}});
  }

  addUser(user){
    this.setState((prevState, props)=>{
      this.state.users.push(user._id);
      return {users: this.state.users}
    });
  }

  removeUser(event){
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
            <div className="col s12 m5">
              <p>Group Permissions</p>
              <select multiple ref="availableperms" className="browser-default">
                {this.getAvailablePerms().map((perm)=>{
                  return <option key={perm._id} value={perm._id}>{perm.pagename}</option>
                })}
              </select>
            </div>
            <div className="col s12 m2">
              <p>&nbsp;</p>
              <div className="row">
                <a className="btn-flat" onClick={this.addPerm.bind(this)}>{"=>"}</a>
              </div>
              <div className="row">
                <a className="btn-flat" onClick={this.removePerm.bind(this)}>{"<="}</a>
              </div>
            </div>
            <div className="col s12 m5">
              <p>New Group Permissions</p>
              <select multiple ref="groupperms" className="browser-default">
                {this.getGroupPerms().map((perm)=>{
                  return <option key={perm._id} value={perm._id}>{perm.pagename}</option>
                })}
              </select>
            </div>
          </div>
          {(this.props.type=="Small Group"||this.props.type=="Team")&&
            <div className="row">
              <div className="col s12">
                {/*}<p>Set leader:*</p>*/}
                <p>Add leaders to the group:</p>
                <SelectUser
                  initialValue={""}
                  updateUser={this.setLeader.bind(this)}
                  id="leaderselect"
								ref="leader" />
								<table>
									<thead>
										<tr>
											<th>Name</th>
											<th>Email</th>
											<th></th>
										</tr>
									</thead>
									<tbody>
										{this.getLeaders().map((user)=>{
											return <tr key={user._id}  id="showhim">
												<td>{user.name}</td>
												<td>{user.emails[0].address}</td>
												<td><span className="material-icons"
													id="showme"
													name={user._id}
													onClick={()=>{this.unsetLeader(user._id)}}>close
												</span>
												</td>
											</tr>
										})}
									</tbody>
								</table>
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
