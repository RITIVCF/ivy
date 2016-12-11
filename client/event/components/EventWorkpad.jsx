import React, {Component} from 'react';
import TinyMCETest from '../../tinyMCETest.jsx';

var updWorkpad = _.throttle(
  function(eid, value)
  {//console.log(value);
    Meteor.call("updateEventWorkpad", eid, value);
    Meteor.call("EventWorkpadLock", eid, true);
  },500);

var setWorkPadFalse = _.debounce(function(thiz, eid){
  //console.log(thiz.state.editting);
  thiz.setState({editting: false});
  Meteor.call("EventWorkpadLock", eid, false);
}, 1000);

export default class EventWorkpad extends Component {
  constructor(props){
    super(props);
    this.state={
      workpad: props.ev.workpad,
      workpadlock: props.ev.workpadlock,
      editting: false
    }
  }

  updateWorkpad(event){
		event.preventDefault();
		Meteor.call("updateEventWorkpad", this.props.eid, this.refs.workpad.value);
		//this.state.value = this.refs.name;
	}

  handleWorkpadChange(event){ // need one of these for each component
    this.setState({workpad:event.target.value});
    this.setState({editting: true});
    updWorkpad(this.props.ev._id, event.target.value);
    ////console.log(this);
    setWorkPadFalse(this, this.props.ev._id);

  }

  shouldComponentUpdate(nextProps,nextState){
    if(!this.state.editting){
      this.state.workpad = nextProps.ev.workpad;
      this.state.workpadlock = nextProps.ev.workpadlock;
      //this.setState({workpadlock: true});
    }
    //this.setState({workpadlock: false});
    return true;
  }

  componentDidMount(){
    var thiz = this;
    tinymce.init({
			selector: "#mytextarea",
      theme: "modern",
      height: 300,
			plugins: "table link textcolor colorpicker autolink fullscreen paste contextmenu hr searchreplace",
			elementpath: false,
			menubar: "edit insert view format table",
			setup : function(editor) {
				editor.on('keyup', function(e) {
            //console.log('key event', e);
						updWorkpad(thiz.props.ev._id, tinymce.activeEditor.getContent());
				    ////console.log(this);
				    setWorkPadFalse(thiz, thiz.props.ev._id);
        });
    }
  	});
  }

  getEvent(){
		////console.log(Events.find({_id: this.props.eid}).fetch());
		//return Events.find({_id: this.props.eid}).fetch();
		return Events.findOne(this.props.eid);
	}


  render(){
    /*let ev = this.props.ev; // this.getEvent();

  	if(!ev){
  		return (<div>Loading...</div>);
  	}
  	var workpad = ev.workpad;
    */
    return(
      <div className="form-group">

        <label>Workspace</label>
          <textarea id="mytextarea">
          </textarea>
        {/*<TinyMCETest ev={this.props.ev}/>}<br/>
        <textarea ref="workpad"
          className="form-control"
          rows="12"
          onChange={this.handleWorkpadChange.bind(this)}
          value={this.state.workpad}
          disabled={this.state.workpadlock||!this.props.perm} />*/}
      </div>
    )
  }
}
