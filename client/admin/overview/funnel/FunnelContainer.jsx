import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import FunnelBlock from './FunnelBlock.jsx';

export default class FunnelContainer extends TrackerReact(React.Component) {
	constructor() {
		super();

	}

  render() {
    return(
      <div>
        {this.props.data.map( (block, i) => {
          return <FunnelBlock key={i} block={block} />
        })}
      </div>
    )
  }
}
