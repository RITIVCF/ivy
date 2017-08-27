import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import MainBox from '../../MainBox.jsx';
import EmailWorkspace from './EmailWorkspace.jsx'
import LoaderCircle from '../../LoaderCircle.jsx';
import NoPerm from '../../NoPerm.jsx';

import EmailWorkspacePanel from './EmailWorkspacePanel.jsx';
import { loadEmail } from '/lib/emails.js';

//Contacts = new Mongo.Collection('contacts');

export default class EmailWorkspaceWrapper extends TrackerReact(React.Component){
  constructor(props) {
    super(props);

    this.state = {
      subscription: {
        email: Meteor.subscribe("myEmails"),
        events: Meteor.subscribe("emailEvents", this.props.emid)
      }
    };


  }

  getSubHeader(email) {
    return [<ul key="0" style={{marginLeft: "20px"}} className="left black-text">{email.subject}</ul>,
		<SendToMe key={1} style={{marginRight: "20px"}} right={true} emid={this.props.emid} />
    ]
  }

  componentWillUnmount() {
    this.state.subscription.email.stop();
    this.state.subscription.events.stop();
  }

	getEmail(){
		return loadEmail(this.props.emid);
	}

  render() {
    if(!this.state.subscription.email.ready()){
      return (<LoaderCircle />)
    }
    if(!checkPermission("emails")){
      return <NoPerm />
    }
    setDocumentTitle("Email Workspace");
		let email = this.getEmail();

    return (
      <MainBox
        content={<EmailWorkspace email={email} />}
        subheader={this.getSubHeader(email)}
        showinfobar={true}
        infobar={<EmailWorkspacePanel email={email} />}
        />
    )
  }
}






export class SendToMe extends React.Component {
	constructor(){
		super();

		this.state = {
			loading: false
		}

	}

	render(){
		return (
			<Navbar
				right={this.props.right}
				style={this.props.style}
			>
				{
					this.state.loading&&
					<li>
						<LoaderCircle style={{"paddingTop": "0px"}} />
					</li>
				}
				<NavbarItem>
					<Button
						onClick={this.sendToMe.bind(this)}
						disabled={this.state.loading}
					>
						Send To Me
					</Button>
				</NavbarItem>
			</Navbar>
		)

	}

	sendToMe() {
		this.setState({loading: true});
    Meteor.call("sendToMe", this.props.emid, (error) => {
			if(error) {
				Materialize.toast("Could not send email", 2000);
				this.setState({loading: false});
			} else {
				this.setState({loading: false});
				Materialize.toast("Sent to you", 2000);
			}
		});
  }


}
