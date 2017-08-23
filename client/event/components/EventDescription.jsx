import React, {Component} from 'react';

var updDescription = _.throttle(
  function(eid, value)
  {
    Meteor.call("updateEventDescription", eid, value);
    Meteor.call("EventDescriptionLock", eid, true);
  },500);

var setDescFalse = _.debounce(function(thiz, eid){
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
		return Events.findOne(this.props.eid);
	}

  edit(){
    this.setState({edit: true})
  }

  close(){
    event.preventDefault();
    this.setState({edit: false});
  }

  submit(event){
		event.preventDefault();
		Meteor.call("updateEventDescription", this.props.ev._id, this.refs.description.value);
    this.setState({edit: false});
	}


  render(){
    let edit = this.state.edit;
    return(
      <div className="row">
        <label>Advertising Description</label>{(this.props.perm&&!edit)&&<i className="tiny material-icons" onClick={this.edit.bind(this)}>edit</i>}
				{edit?<form onSubmit={this.submit.bind(this)}>
					<div className="input-field col s12">
						<textarea ref="description"
							id="description"
							className="materialize-textarea"
							defaultValue={this.state.description}
						/>
					</div><input type="submit" className="btn" value="Save" />
          <button type="button" onClick={this.close.bind(this)} className="btn">Cancel</button>
					<p style={{fontSize: "small",	color: "grey", fontStyle: "italic"}}>*This description is for use in IVCF publications and is meant for advertising purposes. All internal descriptions and planning should go in the workpad.</p>
        </form>:<p>{this.props.ev.description}</p>}
      </div>
    )
  }
}
