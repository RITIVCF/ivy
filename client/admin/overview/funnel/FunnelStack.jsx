import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import FunnelBar from './FunnelBar.jsx';
import FunnelTooltip from './FunnelTooltip.jsx';

export default class FunnelStack extends TrackerReact(React.Component) {
	constructor() {
		super();

		this.state = {
      hover: false
		};

    this.hoverOff = this.hoverOff.bind(this);
    this.hoverOn = this.hoverOn.bind(this);
	}

  hoverOn() {
    this.setState({hover: true});
  }

  hoverOff() {
    this.setState({hover: false});
  }

  render() {
    return(
      <div onMouseEnter={this.hoverOn} onMouseLeave={this.hoverOff} style={this.props.stack.style}>
        {this.renderBar(this.props.stack.bars)}
        {this.state.hover &&
          <FunnelTooltip label={"Tooltip"} bars={this.props.stack.bars} />
        }
      </div>
    )

  }

  renderBar(bars, i=0){
    if ( bars.length <= i ) {
      return null;
    }
    return (
      <FunnelBar count={bars[i].count} style={bars[i].style} >
        {this.renderBar(bars, i+1)}
      </FunnelBar>
    )
  }

}
