import React, {Component} from 'react';

var updDescription = _.throttle(
  function(eid, value)
  {//console.log(value);
    Meteor.call("updateEventDescription", eid, value);
    Meteor.call("EventDescriptionLock", eid, true);
  },500);

var setDescFalse = _.debounce(function(thiz, eid){
  //console.log(thiz.state.editting);
  thiz.setState({editting: false});
  Meteor.call("EventDescriptionLock", eid, false);
}, 1000);


export default class EventDescription extends Component {
  constructor(props){
    super(props);
    this.state={
      modal: false,
      description: props.ev.description,
      descriptionlock: props.ev.descriptionlock,
      editting: false
    }
  }
  updateDescription(event){
		event.preventDefault();
		Meteor.call("updateEventDescription", this.props.eid, this.refs.description.value);
		//this.state.value = this.refs.description;
	}

  handleDescriptionChange(event){ // need one of these for each component
    this.setState({description:event.target.value});
    this.setState({editting: true});
    updDescription(this.props.ev._id, event.target.value);
    setDescFalse(this, this.props.ev._id);
  }

  shouldComponentUpdate(nextProps, nextState){
    if(!this.state.editting){
      this.state.description = nextProps.ev.description;
      this.state.descriptionlock = nextProps.ev.descriptionlock;
    }
    return true;
  }

  componentDidRender(){
    Materialize.updateInputFields();
  }

  getEvent(){
		////console.log(Events.find({_id: this.props.eid}).fetch());
		//return Events.find({_id: this.props.eid}).fetch();
		return Events.findOne(this.props.eid);
	}

  edit(){
    //React.render(<DescriptionModal eid={this.props.eid} />, this.refs.modal);
    this.setState({edit: true})
  }

  close(){
    event.preventDefault();
    this.setState({edit: false});
  }

  submit(event){
		event.preventDefault();
    console.log("Submitting...", this.refs.description.value);
		Meteor.call("updateEventDescription", this.props.ev._id, this.refs.description.value);
    this.setState({edit: false});
	}


  render(){
    let edit = this.state.edit;
    return(
      <div className="row">
        <label>Description</label>{(this.props.perm&&!edit)&&<i className="tiny material-icons" onClick={this.edit.bind(this)}>edit</i>}
          {edit?<form onSubmit={this.submit.bind(this)}>
            <div className="input-field col s12">
              <textarea ref="description"
                id="description"
                className="materialize-textarea"
                defaultValue={this.state.description}
                />
            </div><input type="submit" className="btn" value="Save" />
          <button type="button" onClick={this.close.bind(this)} className="btn">Cancel</button>
        </form>:<p>{this.props.ev.description}</p>}
      </div>
    )
  }
}
