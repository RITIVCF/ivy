import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import SmallGroupSingle from './SmallGroupSingle.jsx';

export default class SmallGroupWrapper extends TrackerReact(React.Component){
  render(){
    return (
      <div>
        <h1>We study the Bible in Small Groups</h1>
        <p>Small groups at RIT create an opportunity for us to grow in our
          relationships with others, study the Bible, learn more about living
          like Jesus, and challenge each other to take next steps in response
          to what we learn together. Small groups are a great place to jump in
          if you are new to InterVarsity! Most groups meet weekly and are a
          fantastic way to connect with a group of people who are all invested
          in growing together. Check out our groups below, or consider
          starting your own!</p>
        <ul>
          <SmallGroupSingle />
        </ul>
      </div>
    )
  }
}
