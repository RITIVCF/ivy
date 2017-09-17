import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import LoaderCircle from '../LoaderCircle.jsx';
import MainBox from '../MainBox.jsx';

export default class FormWrapper extends TrackerReact(React.Component) {
  constructor() {
    super();

  }

  getSubHeader(){
    return (
      <ul></ul>)

  }

	render() {
		return (
      <MainBox
        content={<div/>}
        subheader={this.getSubHeader()}
        showinfobar={false}
        infobar={<div></div>}
        />
    )
	}
}
