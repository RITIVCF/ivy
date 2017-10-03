import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class FunnelBar extends TrackerReact(React.Component) {
	constructor() {
		super();

	}

	componentDidMount() {

	}



	render() {
    const barStyle = {...style, ...this.props.style};
    return (
      <div style={barStyle} className="funnel-bar">
        {this.props.children}
      </div>
		)

	}
}

const style = {
  height: "10px",
  width: '80px',
  backgroundColor: "red"
};
