import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class EmailBanner extends React.Component {
  render() {
    return (
      <section className="banner">
        <div className="inner">
        <div className="borders">
        <img src="/images/InterVarsity-RIT-logo.png" />
        </div>
        <p>Intervarsity Christian Fellowship<br />
        at Rochester Institute of Technology<br /></p>
        </div>
        <div className="parallax">
          <img src="images/defaultEvent.jpg" />
        </div>
      </section>
    );
  }
}
