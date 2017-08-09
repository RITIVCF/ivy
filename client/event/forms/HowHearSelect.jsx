import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class HowHearSelect extends TrackerReact(React.Component){
  constructor(props) {
    super(props);

    this.state = {
      other: false
    };
  }


  checkOther(){
    if(this.refs.howhear.value=="Other"){
      this.setState({other: true});
    }
    else{
      this.setState({other: false});
    }
  }

  componentWillUpdate(){
    var thiz = this;
    $('li').on("click", function(event){
      if(event.target.innerHTML=="Other"){
        thiz.setState({other: true});
      }else{
        thiz.setState({other: false});
      }
    });
  }

  componentDidMount(){
    var thiz = this;

    $('select').material_select();
    $('li').on("click", function(event){
      if(event.target.innerHTML=="Other"){
        thiz.setState({other: true});
      }else{
        thiz.setState({other: false});
      }
    });
  }

  getOptions(){
    return Options.findOne("howhear").vals;
  }


  render() {
      return (
        <div>
          <select ref="howhear" defaultValue="" required onChange={this.checkOther.bind(this)} >
            <option value="" disabled>How did you hear about us?</option>
            {this.getOptions().map((option)=>{
              return <option key={option} value={option} >{option}</option>
            })}
            <option value="Other">Other</option>
          </select>
          {this.state.other?<input type="text" ref="other" placeholder="Please specify..." required />:""}
        </div>
      )

  }
}
