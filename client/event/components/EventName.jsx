import React, {Component} from 'react';

var updName = _.throttle(
  function(eid, value)
  {
    Meteor.call("updateEventName", eid, value);
    Meteor.call("EventNameLock", eid, true);
  },500);

var setNameFalse = _.debounce(function(thiz, eid){
  thiz.setState({editting: false});
  Meteor.call("EventNameLock", eid, false);
}, 1000);

export default class EventName extends Component {
  constructor(props){
    super(props);
    this.state={
      name: props.ev.name,
      namelock: props.ev.namelock,
      editting: false,
      editstate: false
    }
  }
  updateName(event){
		event.preventDefault();
		Meteor.call("updateEventName", this.props.ev._id, this.refs.name.value);
    this.toggle();
	}

  handleNameChange(event){ // need one of these for each component
    this.setState({name:event.target.value});
    this.setState({editting: true});
    updName(this.props.ev._id, event.target.value);
    setNameFalse(this, this.props.ev._id);
  }

  componentDidUpdate(){
    if(this.refs.name){
            this.refs.name.focus();
    }
  }

  shouldComponentUpdate(nextProps,nextState){
    if(!this.state.editting){
      this.state.name = nextProps.ev.name;
      this.state.namelock = nextProps.ev.namelock;
    }
    return true;
  }

  toggle(){
    if(!this.props.perm){
      return;
    }
    this.setState({editstate: !this.state.editstate});
  }

  getEvent(){
		return Events.findOne(this.props.eid);
	}


  render(){
    let editstate = this.state.editstate;
    if(!this.state.editstate){
      return <span className="card-title">{this.state.name}
        {this.props.perm&&<i className="tiny material-icons white-text" onClick={this.toggle.bind(this)}>edit</i>}
      </span>
    }
    return(
      <form onSubmit={this.updateName.bind(this)}>
        <input type="text"
          ref="name"
          defaultValue={this.state.name}
           />
           <input type="submit" className="btn" value="Save" />
         <button type="button" onClick={this.toggle.bind(this)} className="btn">Cancel</button>
       </form>
    )
  }
}
