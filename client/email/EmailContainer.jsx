import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import EmailContent from './EmailContent.jsx';

export default class EmailContainer extends TrackerReact(React.Component){
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
      <div className="col s12">
        <EmailContent emid={this.props.emid} />
      </div>
    )
  }
}
