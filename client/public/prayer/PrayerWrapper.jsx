import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import PrayerSingle from './PrayerSingle.jsx';

export default class PrayerWrapper extends TrackerReact(React.Component){
  render(){
    return (
      <div>
        <h1>We connect with God through Prayer</h1>
        <p>Do you like talking with your best friend? We do, too. That''s
          why we have prayer meetings every Sunday evening. We have fun
          talking with God, experimenting with different ways to do so,
          and learning and growing from what He says in our conversations.
          Hang out with us and your best friend, and if God isn't your best
          friend, come and get to know Him and us better together.<br/><br/>
        Open to Everyone!</p>
      <ul>
        <PrayerSingle />
      </ul>
      </div>
    )
  }
}
