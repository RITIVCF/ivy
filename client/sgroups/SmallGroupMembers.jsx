import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class SmallGroupMembers extends TrackerReact(React.Component) {
  constructor() {
    super();


  }

  componentWillUnmount() {

  }

  componentDidMount(){
    $('ul.tabs').tabs();
  }




	render() {
		return (
      <div className="container">
        <div className="row">
          <div className="col s12">
            <div className="divider"></div>
            <div className="row">
              <div className="col s12 m6 l4">
                <div className="card left">
                  <div className="card-content">
                    <span className="card-title">Member Name</span>
                  </div>
                </div>
              </div>
              <div className="col s12 m6 l4">
                <div className="card left">
                  <div className="card-content">
                    <span className="card-title">Member Name</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    )
	}
}
