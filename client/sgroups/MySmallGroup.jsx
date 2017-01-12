import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class MySmallGroup extends TrackerReact(React.Component) {
  constructor() {
    super();


  }

  componentWillUnmount() {

  }

  componentDidMount(){
    $('ul.tabs').tabs();
  }

  getLeader(){
    if(this.props.sg.leader==Meteor.userId()){
      return {name:"Me"};
    }
    return Meteor.users.findOne(this.props.sg.leader);
  }




	render() {
    let sg= this.props.sg;
		return (
      <div className="container">
        <div className="row">
          <div className="col s12">
            <div className="card">
              <div className="card-content">
                <span className="card-title">{sg.name}</span>
                <p><b>Leader:</b> {this.getLeader()?this.getLeader().name:"No Leader"}</p>
              </div>
            </div>
          </div>
          <div className="col s12 m8">
            <div className="card">
              <div className="card-content">
                <span className="card-title">New Post</span>
                <textarea className="browser-default" placeholder="Enter new post..."/>
              </div>
              <div className="card-action">
                <a className="btn">Post</a>
              </div>
            </div>
            <div className="card">
              <div className="card-content">
                <span className="card-title">Post</span>
                <p>This is a post about stuff going on and things like that so that the group can have some conversations and stuff going on.</p>
              </div>
            </div>

            <div className="card">
              <div className="card-content">
                <span className="card-title">Post</span>
                <p>This is a post about stuff going on and things like that so that the group can have some conversations and stuff going on.</p>
              </div>
            </div>
          </div>
          <div className="col s12 m4">
            <div className="card">
              <div className="card-content">
                <span className="card-title">Description</span>
                <p>This is the description of the small group. This can be changed by the small group leader or small group coordinator.
                  This is the description of the small group. This can be changed by the small group leader or small group coordinator.
                  This is the description of the small group. This can be changed by the small group leader or small group coordinator.</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    )
	}
}
