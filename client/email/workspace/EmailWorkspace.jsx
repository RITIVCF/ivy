import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import EmailContainer from '/client/email/components/EmailContainer.jsx';

export default class EmailWorkspace extends TrackerReact(React.Component){
  constructor() {
    super();


    this.state = {

    };

    this.EmailContainer = new EmailContainer();

  }

  componentWillUnmount() {

  }

	componentDidMount() {
		console.log(this.refs.emailtemplate);
		console.log(this.refs.emailtemplate.contentWindow.document);
		console.log(this.refs.emailtemplate.contentWindow.document.body.innerHTML);
		let email = this.getEmail();
		this.setContent("Test Content");

	}

	componentWillUpdate(nextProps){
		// Email Container = new Email Containter
		// this.setContent(emailContainer.renderHTML());
		this.setContent("Test Content");
	}

	setContent(content){
		this.refs.emailtemplate.contentWindow.document.body.innerHTML = content;
	}

	getEmail(){
		return this.props.email;
	}

  render() {
    return (
      <div>
				<iframe
					ref="emailtemplate"
					style={{width: "100%", height: "100%"}}
					>
				</iframe>
			</div>
    )
  }
}
