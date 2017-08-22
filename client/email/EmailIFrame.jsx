import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { buildHTML } from '/lib/emails.js';

export default class EmailIFrame extends TrackerReact(React.Component){
  constructor() {
    super();


  }

  componentDidMount() {
		this.setContent();
	}

  setContent(){
    this.refs.emailtemplate.contentWindow.document.body.innerHTML = this.props.contentstring;
	}

  render() {
    return (
      <div>
				<iframe
					ref="emailtemplate"
					style={{width: "100%", height: "100%", border: "none", position: "fixed"}}
					>
				</iframe>
			</div>
    )
  }

}
