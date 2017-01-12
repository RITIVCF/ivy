import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';


export default class LoaderCircle extends TrackerReact(React.Component) {

	render() {
		return (
			<div className="center-align" style={{paddingTop:"50px"}}><div className="preloader-wrapper big active">
                <div className="spinner-layer spinner-blue-only">
                  <div className="circle-clipper left">
                    <div className="circle"></div>
                  </div><div className="gap-patch">
                    <div className="circle"></div>
                  </div><div className="circle-clipper right">
                    <div className="circle"></div>
                  </div>
                </div>
              </div></div>

		)
	}
}
