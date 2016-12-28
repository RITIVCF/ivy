import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import moment from 'moment';

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
    var eventags = Options.findOne("eventtags");
    return eventags.vals;
  }

  render() {
    return (
      <div>
        <ul className="legend">
        {this.getEventTags().map((tag)=>{
          return <li>
            <input id={tag.tag} type="checkbox"></input>
            <label htmlFor={tag.tag} style={{color: tag.color}}>{tag.tag}</label>
          </li>
        })}
      </ul>
      </div>
    );
  }
}
