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
    console.log("stack: ", this.props.block);
    return(
      <div>
        {this.props.block.data.map( (stack, i) => {
          return <FunnelStack key={i} stack={stack} />
        })}
      </div>
    )

  }


}
