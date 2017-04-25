import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import AffiliationsTag from './AffiliationsTag.jsx';


export default class CampusAffiliations extends TrackerReact(React.Component){


  getAffiliations(){
    return Options.findOne("campusaffiliations").vals;
  }


  render(){
    let tags = this.props.contact.getAffiliations();

    return(
      <div>
        {Options.findOne("campusaffiliations") &&
          this.getAffiliations().map( (tag)=>{
            return <AffiliationsTag key={tag}
              tag={tag}
              contact={this.props.contact}
              checked={(tags.indexOf(tag) != -1)}
              disabled={this.props.disabled} />
          })
        }
      </div>
  )
  }
}
