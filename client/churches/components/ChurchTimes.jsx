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
      <a className="waves-effect waves-light btn"
        onClick={this.add.bind(this)}>Add New Time</a>
      <table>
        <thead>
          <tr>
            <th>Day</th>
            <th>Time</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {this.props.ch.times.map( (time,i)=>{
    				return <Time key={time.day+time.time+i} ch={this.props.ch} time={time} />
    			})}
        </tbody>
      </table>
    </div>
  )
  }
}
