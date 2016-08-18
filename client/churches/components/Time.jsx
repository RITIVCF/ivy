import React, {Component} from 'react';
import SelectOption from '../../sharedcomponents/SelectOption.jsx';
import SelectTime from '../../sharedcomponents/SelectTime.jsx';


export default class Time extends Component {
  constructor() {
    super();
    this.state = {
      editting: false
    };

  }

  edit(event){
    event.preventDefault();
    console.log("Begin edit.");
    this.setState({
      editting: true
    });
  }

  closeedit(event){
    event.preventDefault();
    Meteor.call("updateChurchTime", this.props.ch._id,
     this.props.time.day,
     this.props.time.time,
     this.refs.day.value,
     this.refs.time.state.value);
    console.log(this.refs.time.state.value);
    this.setState({
      editting: false
    });
  }

  close(event){
    event.preventDefault();
    this.setState({
      editting: false
    });
  }

  remove(event){
    event.preventDefault();
    Meteor.call("removeChurchTime", this.props.ch._id, this.props.time.day, this.props.time.time);
  }

  handleDayChange(event){
    this.setState({day: event.target.value});
  }

  handleTimeChange(event){
    this.setState({time: event.target.value});
  }

  getTimes(){
    return Options.findOne({_id:"times"}).vals;
  }

  render(){
    var options = [];
    this.getTimes().map( (time)=>{
      options.push({name: time, value: time});
    });
    return(
      <li>
    {this.state.editting==true ? // No form so no submit on *Enter*
      <form>
        {/*}<input type="hidden" ref="id" value={this.props.address._id} />*/}
        <select ref="day" value={this.props.time.day} onChange={this.handleDayChange}>
          <option value={"Sunday"}>Sunday</option>
          <option value={"Monday"}>Monday</option>
          <option value={"Tuesday"}>Tuesday</option>
          <option value={"Wednesday"}>Wednesday</option>
          <option value={"Thursday"}>Thursday</option>
          <option value={"Friday"}>Friday</option>
          <option value={"Saturday"}>Saturday</option>
        </select>
        {/*}<select ref="time" value={this.props.time.time}  onChange={this.handleDayChange.bind)this}>
          {Meteor.settings.public.times.map( (time)=>{
            return <SelectOption key={time} value={time} displayvalue={time} />
          })}
        </select>
        <SelectSearch options={options}
          value={this.props.time.time}
          ref="time"
          placeholder={this.props.time.time} />  */}
        <SelectTime ref="time"  initialValue={this.props.time.time}
           />
        <button onClick={this.closeedit.bind(this)}>Save</button>
        <button onClick={this.close.bind(this)}>Close</button>
      </form>
      :
      <div onClick={this.edit.bind(this)}>
        <div>{this.props.time.day}, {this.props.time.time}</div>
      </div>
    }
    <button onClick={this.remove.bind(this)}>X</button>
    </li>
    )
  }
}
