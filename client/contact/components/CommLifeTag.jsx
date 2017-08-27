import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';


export default class CommLifetag extends TrackerReact(React.Component){
  updateTags(event){
		event.preventDefault();

	}

  addRemove(event){
    if(this.refs[this.props.tag].checked){
      this.props.contact.addCommunityLifeTag(this.props.tag);
    }
    else{
      this.props.contact.removeCommunityLifeTag(this.props.tag);
    }
  }


  render(){
    let tag = this.props.tag;
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
				<label  htmlFor={tag}>{tag}</label>
    </div>
  )
  }
}
