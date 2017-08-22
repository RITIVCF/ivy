import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import {buildHTML} from '/lib/emails.js';

export default class EmailWorkspace extends TrackerReact(React.Component){
  constructor() {
    super();


  }

  componentWillUnmount() {

  }

	componentDidMount() {
		let email = this.getEmail();
		this.setContent();

	}

	componentDidUpdate(nextProps){
		// Email Container = new Email Containter
		// this.setContent(emailContainer.renderHTML());
		this.setContent();
	}

	setContent(){
    let content = buildHTML(this.getEmail());
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
