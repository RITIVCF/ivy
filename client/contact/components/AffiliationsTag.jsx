import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';


export default class AffiliationsTag extends TrackerReact(React.Component){
  updateTags(event){
		event.preventDefault();

	}

  addRemove(event){
    this.props.contact.setAffiliation(this.props.tag, this.props.checked);
  }


  render(){
    let tag = this.props.tag;
  	//var tags = this.props.contact.communitylife;
    return(
      <div>
        <input
          type="checkbox"
          ref={tag}
          readOnly={true}
          id={tag}
          disabled={this.props.disabled}
          name={tag}
          onClick={this.addRemove.bind(this)}
          checked={this.props.checked}
        />
      <label  htmlFor={tag}>{tag}:</label>
    </div>
  )
  }
}
