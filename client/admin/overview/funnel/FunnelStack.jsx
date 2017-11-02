import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import FunnelBar from './FunnelBar.jsx';

export default class FunnelStack extends TrackerReact(React.Component) {
	constructor() {
		super();

  }

  render() {
    let label = this.props.label + "\n";
    this.props.bars.map( (bar, i) => {
      label = label + bar.label + ": " + bar.count + "\n"
    })
    return(
      <div className="funnel-stack" style={this.props.style} onMouseEnter={this.hoverOn} onMouseLeave={this.hoverOff} data-tooltip={label}>
        {this.renderBar(this.props.bars)}
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
