import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class IndexWrapper extends TrackerReact(React.Component){
  render(){
    return (
      <div>
        <h1>This is the Hompage</h1>
        <h2>WE ARE A VIBRANT CAMPUS MINISTRY THAT ESTABLISHES AND
          ADVANCES WITNESSING COMMUNITIES OF STUDENTS AND FACULTY.</h2>
        <p>We minister to students and faculty through small group Bible
          studies, large gatherings on campus, leadership training,
          thoughtful discipleship and life-changing conferences and events.</p>
        <h2>Our Vision</h2>
        <ul>
          <li>Students and Faculty Transformed</li>
          <li>Campuses Renewed</li>
          <li>World Changers Developed</li>
        </ul>
      </div>
    )
  }
}
