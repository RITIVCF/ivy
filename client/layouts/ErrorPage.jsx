import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';


export default class ErrorPage extends TrackerReact(React.Component) {
	constructor(){
		super();
		this.state = {
			subscription: {
				user: Meteor.subscribe("userSelf")
			}
		}
	}

	render() {
		
		return (
		<div>
			<h1>Not Found</h1>
				<p>Aw darn. It happened again. It seems whatever you were looking for doesn't
					exist. Sorry about that! We're trying to get the sneaky gremlins out of the system.
					They keep taking our pages. I wonder where they keep them...?
					Anyway, try heading back to the dashboard and starting again.
					Heres a picture of a cat. Because we can.<br/>Once we figure out how to get pictures on
					here...</p><br/><br/>
				<p>We did figure out how to put pictures on here but Alex is too lazy to upload a cat
					pic. Maybe if you get really mad at him and start yelling and kicking and screaming
					he will put the picture up.</p>
				<p>Grab your torches and pitchforks and let's go get him!</p>
				<br/>
				<p>I mean... or not. That's cool too.</p>

		</div>
		)
	}
}
