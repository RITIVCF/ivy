import React, { Component, PropTypes } from 'react';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import moment from 'moment';
import momentLocalizer from 'react-widgets/lib/localizers/moment';


export default class ReoccuringEventWindow extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            overlayState: "hidden",
            ev: props.ev
        };
    }

    componentWillUnmount(){

    }

    toggleOverlay()
    {
        if(this.state.overlayState == "hidden")
        {
            this.setState({overlayState: ""});
        }
        else
        {
            this.setState({overlayState: "hidden"});
        }
    }

    openOverlay(){
      this.setState({overlayState:""});
    }

    closeOverlay(){
      this.setState({overlayState:"hidden"});
      console.log(this.state.ev);
    }

    numbers(){
      return [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
    }

    /*getEvent(){
  		//console.log(Events.find({_id: this.props.eid}).fetch());
  		//return Events.find({_id: this.props.eid}).fetch();
  		return Events.findOne(this.props.eid);
  	}*/



    render()
    {
        return (
            <div>
              <div id="reoccuringEventOverlay" className={this.state.overlayState} onClick={this.closeOverlay.bind(this)}></div>
              <div id="reoccuringEventPopup" className={this.state.overlayState}>
                <h2>Repeat</h2>
                <label>Repeat: </label><p>Weekly</p>
                <label>Repeat every: </label>
                <select ref="everyx" >
                  {this.numbers().map((number)=>{
                    return <option value={number}>{number}</option>
                  })}
                </select><p>weeks</p>
                <label>Starts On: </label>
                <input type="text" readOnly={true} disabled={true} value={this.props.ev.start.toLocaleDateString()} />
                <label>End</label>
                <input type="radio" ref="ends" name="ends" value="occurences" /><p>After</p><input type="text" ref="occurences" /><p>occurrences</p>
                <input type="radio" ref="ends" name="ends" value="ondate" /><p>On</p><DateTimePicker ref="endsdate" time={false} />
                <label>Summary:</label><p>Weekly on {moment(this.props.ev.start).format("dddd")}, {this.refs.rsvp.value=="occurences" ? this.refs.occurences.value+" times":"until "+this.refs.enddate.value}</p>
                <button>Accept</button>
                <button onClick={this.closeOverlay.bind(this)}>Cancel</button>

              </div>
            </div>
        );
    }
}
