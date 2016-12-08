import React, {Component} from 'react';



export default class Tag extends Component {

  removeTag(event){
    event.stopPropagation();
      Meteor.call("removeEventTag", this.props.eid, this.props.tag);
  }

  render(){
    return(
      <div className="chip">
        {this.props.tag}
        <i onClick={this.removeTag.bind(this)} className="close material-icons">close</i>
      </div>
    )
  }
}
