import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';


export default class EmailPreview extends TrackerReact(React.Component){
  constructor() {
    super();

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div className="row">
        {this.props.emid}
      </div>
    )
  }
}
