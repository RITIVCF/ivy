import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import moment from 'moment';
import LegendItem from './LegendItem.jsx';

export default class LegendFilter extends TrackerReact(React.Component) {
  /*
  constructor(){
    super();
  }

  componentWillMount(){

  }

  componentDidMount(){
    var thiz = this;
  }
*/

  getEventTags(){
    var eventtags = Options.findOne("eventtags");
    if(!eventtags.vals){
      return [];
    }
    return eventtags.vals;
  }

  render() {
    return (
      <div>
        <ul className="legend">
        {this.getEventTags().map((tag)=>{
          // var checked = false;
          if(!Session.get("calendartagfilter")){
            return false;
          }
          // if(Session.get("calendartagfilter").indexOf(tag.tag)){
          //   var checked= true;
          // }
          return <LegendItem key={tag.tag} tag={tag} checked={Session.get("calendartagfilter").indexOf(tag.tag)!=-1} />
        })}
      </ul>
      </div>
    );
  }
}
