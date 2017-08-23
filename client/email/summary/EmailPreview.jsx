import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import EditEmailDetailsForm from '/client/email/summary/EditEmailDetailsForm';

export default class EmailPreview extends TrackerReact(React.Component){
  constructor() {
    super();

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div>
				{!this.props.email.isSent()&&
					<EditEmailDetailsForm
						email={this.props.email}
					/>
				}

      </div>
    )
  }
}
