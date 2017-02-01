import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import GroupWorkspace from './GroupWorkspace.jsx';

export default class NewGroupModal extends TrackerReact(React.Component) {
  constructor(){
    super();
    // var perms = PagePermissions.find().fetch()
    // var permarray =[];
    // perms.forEach((perm)=>{
    //   permarray.push(perm._id);
    // });
    this.state = {
      // selectvalue: "",
      // createdisabled: true,
      // allperms: permarray,
      // availableperms: permarray,
      // groupperms: [],
      // users: [],
      // leader: {name: ""}
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

  delete(){
    Meteor.call("removeGroup",this.props.group._id);
  }

  open(){
    $("#editgroupmodal"+this.props.group._id).appendTo("body").modal("open");
  }

  create(){
    // you can grab the page perm ids from 'this.state.groupperms' array
    var id = this.props.type=="Team"||this.props.type=="Small Group"?this.state.leader._id:"";

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
    return PagePermissions.find({groups: {$ne: this.props.group._id}}).fetch();
  }

  getGroupPerms(){
    return PagePermissions.find({groups: this.props.group._id}).fetch();
  }

  addPerm(){

  }

  removePerm(){

  }

  setLeader(user){
    this.setState({leader: user});
  }

  unsetLeader(){
    this.setState({leader: {name: ""}});
  }

  addUser(user){

  }

  removeUser(event){
    // console.log(event.target.value);
    // console.log(event.target);
    var id = event.target.name;

  }

  getUsers(){
    return Meteor.users.find({_id: {$in: this.props.group.users}});
  }


  render() {
    return (
      <div id={"editgroupmodal"+this.props.group._id} className="modal modal-fixed-footer">
        <div className="modal-content">
          <GroupWorkspace group={this.props.group} />
        </div>
        <div className="modal-footer">{/*buttons top to bottom go right to left */}
          <a className="modal-action modal-close waves-effect waves-green btn-flat">Close</a>
          <a onClick={this.delete.bind(this)} className="modal-action modal-close waves-effect waves-green btn red">Remove</a>
        </div>
      </div>
    )
  }
}
