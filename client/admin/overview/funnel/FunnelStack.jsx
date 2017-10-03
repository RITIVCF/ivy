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

	componentDidMount() {

	}



  hoverOn() {
    this.setState({hover: true});
    console.log(this.state.hover);
  }

  hoverOff() {
    this.setState({hover: false});
    console.log(this.state.hover);
  }

  render() {
    console.log("stack: ", this.props.stack);
    return(
      <div onMouseEnter={this.hoverOn} onMouseLeave={this.hoverOff}>
        {this.renderBar(this.props.stack.bars)}
        {this.state.hover &&
          <FunnelTooltip label={"Tooltip"} bars={this.props.stack.bars} />
        }
      </div>
    )

  }

  renderBar(bars, i=0){
    console.log("Bars: ", bars);
    console.log("i: ", i);
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
