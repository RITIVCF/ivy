import React from 'react';

export default class PrayerGroupPortal extends React.Component {

  

  render() {
    const { status } = this.props;
    return (
      <div>
        <div className="card">
          <span className="card-title">Requests to join prayer group:</span>
          <ul class="collection">

            <li class="collection-item">Alvin</li>
            <li class="collection-item">Alvin</li>
            <li class="collection-item">Alvin</li>
            <li class="collection-item">Alvin</li>
          </ul>
        </div>
        <div className="card">
          <span className="card-title">Reported posts:</span>
          <ul class="collection">
            <li class="collection-item">Alvin</li>
            <li class="collection-item">Alvin</li>
            <li class="collection-item">Alvin</li>
            <li class="collection-item">Alvin</li>
          </ul>
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
