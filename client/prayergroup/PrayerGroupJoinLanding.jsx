import React from 'react';

export default class PrayerGroupJoinLanding extends React.Component {
  render() {
    const { status } = this.props;
    return (
      <div id="signinformcontainer">
        <div className="card-panel z-depth-5" id="cardwait">
          <div className="card-content" style={{fontSize: "16px"}}>
            {responses[status]}
          </div>
        </div>
      </div>
    )
  }
}

const responses = {
  success: "Thanks for joining the Prayer Group! You will now be notified when prayer requests are submitted.",
  pending: "Please wait...",
  error: "Oops something went wrong. Please try again."
}
