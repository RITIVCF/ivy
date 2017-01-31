import React, {Component} from 'react';


export default class Tab extends Component {
  constructor(props){
    super(props);
    this.state={
      editting: false
    }
  }

  editName(){
    //this.setState({editting: !this.state.editting});

  }

  handleNameChange(){

  }

  prevDef(event){
    event.preventDefault();
  }

  update(){
    var newtabname = prompt("Please enter new tab name: ");
    console.log(newtabname);
    Meteor.call("changeTabName", this.props.eid, this.props.tab.name, newtabname);
    //Meteor.call("changeTabName", this.props.eid, this.props.tab, this.refs.tab.value);
    this.setState({editting: false});
  }

  render(){
    let tab = this.props.tab;
    if(this.state.editting){
      return (
        <input type="text" ref="tab" value={this.props.tab.name} onChange={this.handleNameChange.bind(this)} onBlur={this.update.bind(this)} />
      )
    }
    return(
      <li onDoubleClick={this.update.bind(this)} className="tab">
        <a onClick={this.prevDef.bind(this)} href={"#"+this.props.tab.name.replace(" ","")} >{tab.name}</a>
      </li>
    )
  }
}
