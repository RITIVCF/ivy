import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import LoaderCircle from '../LoaderCircle.jsx';
import MainBox from '../MainBox.jsx';

export default class FormWrapper extends TrackerReact(React.Component) {
  constructor() {
    super();

    this.state = {
      subscription: {

      }
    };
  }

  componentWillUnmount() {
    //this.state.subscription.Users.stop();
  }

  componentDidMount(){

  }

  getSubHeader(){
    return (
      <ul></ul>)

  }

	render() {
    // document.title = "Ivy - Groups Dashboard";
    // if(){
    //   return (<LoaderCircle />)
    // }
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
