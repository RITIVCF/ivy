import React, {Component} from 'react';
import TinyMCETest from '../../tinyMCETest.jsx';
import Tab from './Tab.jsx';
import Pad from './Pad.jsx';



export default class EventWorkpad extends Component {
  constructor(props){
    super(props);
    this.state={
      workpad: props.ev.workpad,
      workpadlock: props.ev.workpadlock,
      editting: false
    }
  }

  componentWillUnmount(){
    tinymce.remove();
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



  componentDidMount(){
    // var thiz = this;
    // tinymce.init({
		// 	//selector: "#mytextarea",
    //   selector: '#tabname',
    //   theme: "modern",
    //   height: 300,
		// 	plugins: "table link textcolor colorpicker autolink fullscreen paste contextmenu hr searchreplace",
		// 	elementpath: false,
		// 	menubar: "edit insert view format table",
		// 	setup : function(editor) {
		// 		editor.on('keyup', function(e) {
    //         //console.log('key event', e);
		// 				updWorkpad(thiz.props.ev._id, tinymce.activeEditor.getContent());
		// 		    ////console.log(this);
		// 		    setWorkPadFalse(thiz, thiz.props.ev._id);
    //     });
    // }
  	// });
  }

  // getEvent(){
	// 	////console.log(Events.find({_id: this.props.eid}).fetch());
	// 	//return Events.find({_id: this.props.eid}).fetch();
	// 	return Events.findOne(this.props.eid);
	// }

  newTab(){
    Meteor.call("addNewWorkpadTab", this.props.ev._id, function(error, result){
      if(error){
        console.log(error);
        return;
      }
      $('ul.tabs').tabs();
      $('ul.tabs').tabs('select_tab', result);
    });
  }

  getWorkpads(){
    return Events.findOne(this.props.ev._id).workpad;
  }

  init(){
    console.log("Initializing tabs");
    $('ul.tabs').tabs();
  }


  render(){
    /*let ev = this.props.ev; // this.getEvent();

  	if(!ev){
  		return (<div>Loading...</div>);
  	}
  	var workpad = ev.workpad;
    */
    return(
      <div className="row">
        <label>Workspace</label>
          <div className="col s12">
            <ul className="tabs">
              {this.getWorkpads().map((tab)=>{
                return <Tab key={tab.name} tab={tab} eid={this.props.eid} />
              })}
              {this.props.perm?<li className="tab"><a  onClick={this.newTab.bind(this)}>+ Tab</a></li>:""}
            </ul>
          </div>

        {this.getWorkpads().map((pad)=>{
          return <Pad key={pad.name} eid={this.props.ev._id} pad={pad} editperm={this.props.perm} />
        })}



        {/*<TinyMCETest ev={this.props.ev}/>}<br/>
        <textarea ref="workpad"
          className="form-control"
          rows="12"
          onChange={this.handleWorkpadChange.bind(this)}
          value={this.state.workpad}
          disabled={this.state.workpadlock||!this.props.perm} />
          <a className="btn" onClick={this.init.bind(this)}>Initialize</a>*/}
      </div>
    )
  }
}
