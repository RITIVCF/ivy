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

  componentDidUpdate(){
    $("select").material_select();
  }

  edit(event){
    console.log("Begin edit.");
    this.setState({
      editting: true
    });
  }

  closeedit(event){
    event.stopPropagation();
    var day = this.refs.day.value;
    var time = this.refs.time.state.value;
    $("select").material_select('destroy');
    if((day==this.props.time.day)&&(time==this.props.time.time)){
      this.setState({
        editting: false
      });
    }
    else{
      Meteor.call("updateChurchTime", this.props.ch._id,
       this.props.time.day,
       this.props.time.time,
       day,
       time);
    }

    //console.log(this.refs.time.state.value);

  }

  close(event){
    event.stopPropagation();
    this.setState({
      editting: false
    });
    $("select").material_select('destroy');
  }

  remove(event){
    event.stopPropagation();
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
      <tr onClick={this.edit.bind(this)}>
        <td>{this.state.editting?
          <select ref="day" defaultValue={this.props.time.day}>
            <option value={"Sunday"}>Sunday</option>
            <option value={"Monday"}>Monday</option>
            <option value={"Tuesday"}>Tuesday</option>
            <option value={"Wednesday"}>Wednesday</option>
            <option value={"Thursday"}>Thursday</option>
            <option value={"Friday"}>Friday</option>
            <option value={"Saturday"}>Saturday</option>
          </select>:this.props.time.day}</td>
        <td>{this.state.editting?
          <SelectTime ref="time"  initialValue={this.props.time.time} />
            :this.props.time.time}</td>
          <td>{this.state.editting?<span>
          <button onClick={this.closeedit.bind(this)}>Save</button>
          <button onClick={this.close.bind(this)}>Close</button></span>
          :<i onClick={this.remove.bind(this)}
             className="material-icons right">close</i>}</td>



    </tr>
    )
  }
}
