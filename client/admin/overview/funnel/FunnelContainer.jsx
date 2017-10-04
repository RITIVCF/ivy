import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import FunnelBlock from './FunnelBlock.jsx';

export default class FunnelContainer extends TrackerReact(React.Component) {
	constructor() {
		super();

	}

  render() {
    const data = this.props.data;
    return(
      <div className="funnel-container">
        {data.map( (block, i) => {
          return <FunnelBlock key={i} label={block.label} data={block.data} style={block.style} />
        })}
      </div>
    )
  }
}
