import React, {Component} from 'react';
import RTE from '/client/RTE.jsx';

var updWorkpad = _.throttle(
  function(eid, pad, value)
  {
    Meteor.call("updateEventWorkpad", eid, pad, value);
    Meteor.call("EventWorkpadLock", eid, pad, true);
  },500);

var setWorkPadFalse = _.debounce(function(thiz, pad, eid){
  thiz.setState({editting: false});
  Meteor.call("EventWorkpadLock", eid, pad, false);
}, 1000);

export default class Pad extends Component {
  constructor(props){
    super(props);

		this.updateEventWorkpadContent = this.updateEventWorkpadContent.bind(this);

		this.handleChange = _.throttle(this.updateEventWorkpadContent, 1000);
  }

	updateEventWorkpadContent(content){
		Meteor.call("updateEventWorkpad", this.props.eid, this.props.pad.name, content);
	}

  render(){
    return(
      <div className="col s12">
				<RTE
					onChange={this.handleChange}
					value={this.props.pad.content}
				/>
			</div>
    )
  }
}
