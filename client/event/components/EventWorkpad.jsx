import React, {Component} from 'react';
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
	}

  handleWorkpadChange(event){ // need one of these for each component
    this.setState({workpad:event.target.value});
    this.setState({editting: true});
    updWorkpad(this.props.ev._id, event.target.value);
    setWorkPadFalse(this, this.props.ev._id);

  }

  newTab(){
    Meteor.call("addNewWorkpadTab", this.props.ev._id, function(error, result){
      if(error){
        console.error(error);
        return;
      }
      $('ul.tabs').tabs();
      $('ul.tabs').tabs('select_tab', "NewSheet");
    });
  }

  getWorkpads(){
    return Events.findOne(this.props.ev._id).workpad;
  }

  init(){
    $('ul.tabs').tabs();
  }


  render(){

    let workpads = this.getWorkpads();
    return(
      <div className="row">
        <label>Workspace</label>
				{/*}<div className="col s12">
            <ul className="tabs">
					{workpads.map((tab)=>{
					return <Tab key={tab.name} tab={tab} eid={this.props.ev._id} />
					})}
					{/*this.props.perm&&<li className="tab"><a  onClick={this.newTab.bind(this)}>+ Tab</a></li>\}
            </ul>
				</div>*/}

        {workpads.map((pad)=>{
          return <Pad key={pad.name} eid={this.props.ev._id} pad={pad} editperm={this.props.perm} />
        })}
				
      </div>
    )
  }
}
