import React, {Component} from 'react';
import Time from './Time.jsx';

export default class ChurchTimes extends Component {
  // props are: address list from user object
  /*
  addresses(){
    console.log(this.props.addresses);
    return this.props.addresses;
  }*/

  add(){
    //Meteor.call('addMailingAddress');
    Meteor.call('addChurchTime', this.props.ch._id);
  }



  render(){
    if(!this.props.ch.times){
      return(<div>Loading...</div>)
    }
    return (
    <div>
        <button onClick={this.add.bind(this)}>Add New Time</button>
      <ul>
        {this.props.ch.times.map( (time)=>{
  				return <Time key={time.day+time.time} ch={this.props.ch} time={time} />
  			})}
      </ul>
    </div>
  )
  }
}
