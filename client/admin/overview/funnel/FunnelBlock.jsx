import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import FunnelStack from './FunnelStack.jsx';

export default class FunnelBlock extends TrackerReact(React.Component) {
	constructor() {
		super();

		this.state = {

		};

	}

	componentDidMount() {

	}

  render() {
    return(
      <div className="funnel-block" style={this.props.style}>
        <span className="block-label">{this.props.label}</span>
        {this.props.data.map( (stack, i) => {
          return <FunnelStack key={i} style={stack.style} bars={stack.bars} label={stack.label} />
        })}
      </div>
    )

  }


}
