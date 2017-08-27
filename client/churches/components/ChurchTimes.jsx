import React, {Component} from 'react';
import Time from './Time.jsx';

export default class ChurchTimes extends Component {
  // props are: address list from user object

  add(){
    this.props.ch.addTime();
  }

  render(){
    return (
    <div>
      <a className="waves-effect waves-light btn-flat"
        onClick={this.add.bind(this)}>Add New Time</a>
      <div className="card">
        <table>
          <thead>
            <tr>
              <th>Day</th>
              <th>Time</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.ch.getTimes().map( (time,i)=>{
      				return <Time key={time.day+time.time+i} ch={this.props.ch} time={time} i={i} />
      			})}
          </tbody>
        </table>
      </div>
    </div>
  )
  }
}
