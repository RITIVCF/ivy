import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import EmailContainer from '/lib/emails/components/EmailContainer.jsx';

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
		this.setContent();

	}

	componentDidUpdate(nextProps){
		// Email Container = new Email Containter
		// this.setContent(emailContainer.renderHTML());
		this.setContent();
	}

	setContent(){
    let content = this.EmailContainer.renderHTML(this.getEmail());
		this.refs.emailtemplate.contentWindow.document.body.innerHTML = content;
	}

	getEmail(){
		return this.props.email;
	}

  render() {
    Events.find().fetch();
    return (
      <div>
				<iframe
					ref="emailtemplate"
					style={{maxWidth: "100%", height: "100%", border: "none", resize: "horizontal"}}
					>
				</iframe>
			</div>
    )
  }
}
