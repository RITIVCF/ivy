import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import LargeGroupSingle from './LargeGroupSingle.jsx';

export default class LargeGroupWrapper extends TrackerReact(React.Component){
  render(){
    return (
      <div>
        <h1>We Fellowship at Large Group</h1>
        <p>The whole chapter gathers for worship and to discuss about
          topics relevant to our lives. If you want to check out our
          community, you should definitely come to large group. After
          the main event, we always have special after events which
          range from movie nights to rock climbing at the red barn.
          Come for a great night of fellowship! <br/><br/>Open to
          Everyone!</p>
        <ul>
          <LargeGroupSingle />
        </ul>
      </div>
    )
  }
}
