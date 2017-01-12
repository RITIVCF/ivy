import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class SmallGroupGatherings extends TrackerReact(React.Component) {
  constructor() {
    super();


  }

  componentWillUnmount() {

  }

  componentDidMount(){
    $('ul.tabs').tabs();
  }




	render() {
    let sg= this.props.sg;
		return (
      <div className="container">
        <div className="row">
          <div className="col s12">
            <div className="divider"></div>

            <div className="card left col s12">
              <div className="card-content">
                <span className="card-title">{sg.name}</span>
                <p><b>Start:</b></p>
                <p><b>End:</b></p>
                <p><b>Location:</b></p>
              </div>
            </div>
            <div className="card left col s12">
              <div className="card-content">
                <span className="card-title">{sg.name}</span>
                <p><b>Start:</b></p>
                <p><b>End:</b></p>
                <p><b>Location:</b></p>
              </div>
            </div>
          </div>

        </div>

      </div>
    )
	}
}
