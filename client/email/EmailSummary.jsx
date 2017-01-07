import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class EmailSummary extends TrackerReact(React.Component){
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
      <div className="row">
        <div className="col s12">
          
        </div>
      </div>
    )
  }
}
