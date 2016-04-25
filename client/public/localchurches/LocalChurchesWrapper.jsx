import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import LocalChurchesSingle from './LocalChurchesSingle.jsx';

export default class LocalChurchesWrapper extends TrackerReact(React.Component){
  render(){
    return (
      <div>
        <h1>We go to local churches on Sundays</h1>
        <ul>
          <LocalChurchesSingle />
        </ul>
      </div>
    )
  }
}
