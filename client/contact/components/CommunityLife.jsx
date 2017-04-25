import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import CommLifeTag from './CommLifeTag.jsx';


export default class CommunityLife extends TrackerReact(React.Component){
  getCommunityLife(){
    return Options.findOne({_id:"communitylife"}).vals;
  }


  render(){
    let tags = this.props.contact.getCommunityLifeTags();
    return(
      <div>
    {Options.findOne("communitylife").vals ? this.getCommunityLife().map( (tag)=>{
      return <CommLifeTag key={tag}
        tag={tag}
        contact={this.props.contact}
        checked={(tags.indexOf(tag) != -1)}
        disabled={this.props.disabled} />
    }):<div></div>}
  </div>
  )
  }
}
