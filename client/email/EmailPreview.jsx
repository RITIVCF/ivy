import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class EmailSummaryPanel extends TrackerReact(React.Component){
  constructor() {
    super();

    this.state = {
      subscription: {

      }
    };


  }

  componentWillUnmount() {

  }



  render() {
    return (
      <div></div>
    )
  }
}
