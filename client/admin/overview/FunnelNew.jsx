import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { loadData } from './funnel/funnel';
import FunnelContainer from './funnel/FunnelContainer.jsx';

export default class FunnelNew extends TrackerReact(React.Component) {
  render() {
    return (
			<FunnelContainer data={this.getData()} />
    )
  }

	getData(){
		const data = loadData();
		console.log("Data: ", data);
		return data;
	}
}
