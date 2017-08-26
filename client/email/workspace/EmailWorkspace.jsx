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
    let content = buildHTML(this.getEmail(), Meteor.userId());
		this.refs.emailtemplate.contentWindow.document.body.innerHTML = content;
    this.refs.emailtemplate.contentWindow.document.head.innerHTML = "<style> tr.module > td { box-shadow: 0 0 0px 1px #fee inset; } tr.module:hover > td { box-shadow: 0 0 0px 5px #fee inset; } tr.module:before { content: attr(content); display: table-cell !important; position: relative; width: 0; color: #333; font-size: 10px; padding: 5px; font-family: sans-serif; }</style>";

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
