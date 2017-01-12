import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class LegendItem extends TrackerReact(React.Component) {
  constructor(){
    super();

    this.state = {
    //  checked: true
    };
  }
  /*
  componentWillMount(){

  }

  componentDidMount(){
    var thiz = this;
  }
*/
  addRemove(event){
    var tags = Session.get("calendartagfilter");
    if(tags.indexOf(this.props.tag.tag)!=-1){
      tags.splice(tags.indexOf(this.props.tag.tag),1);
    }
    else{
      tags.push(this.props.tag.tag);
    }
    Session.set("calendartagfilter", tags);
  }

  render() {
    let tag = this.props.tag
    return (
      <li>
        <input id={tag.tag} type="checkbox" ref="tag" checked={this.props.checked} onChange={this.addRemove.bind(this)}></input>
        <label htmlFor={tag.tag} style={{color: tag.color}} >{tag.tag}</label>
      </li>
    );
  }
}
