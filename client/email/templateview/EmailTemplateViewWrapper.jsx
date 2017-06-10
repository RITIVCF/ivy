import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import EmailContainer from '/client/email/components/EmailContainer.jsx';
import LoaderCircle from '/client/LoaderCircle.jsx';

export default class EmailTemplateViewWrapper extends TrackerReact(React.Component){
  constructor(props) {
    super(props);

    this.state = {
      subscription: {
				email: Meteor.subscribe("myEmails")
      }
    };


  }

  componentWillUnmount() {

  }

	getEmail(){
		return Emails.findOne(this.props.emid);
	}

  render() {
		let email = this.getEmail();
		if(!email){
			return <LoaderCircle />
		}
    return (
      <div>{email.content}</div>
    )
  }
}
