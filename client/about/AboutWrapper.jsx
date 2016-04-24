import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class AboutWrapper extends TrackerReact(React.Component){
  render(){
    return (
      <div>
        <h1>About Page</h1>
        <p>This is some paragraph test text to see what happens.</p>
        <p>I think that we should make this site somewhat free to
        be able to edit the text in it without needing special tech skills.</p>
      </div>
    )
  }
}
