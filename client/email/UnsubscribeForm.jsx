import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class UnsubscribeForm extends TrackerReact(React.Component){
  constructor() {
    super();


  }

  componentWillUnmount() {

  }

	componentDidMount() {
		this.props.token;

	}

  render() {
    return(
      <div id="signinformcontainer">
        <div className="card-panel z-depth-5" id="cardwait">
          <div className="card-content" style={{fontSize: "16px"}}>
            You have been unsubscribed from the newsletter. Sorry to see you go!
          </div>
        </div>
      </div>
    )

  }


}
