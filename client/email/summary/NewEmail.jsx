import React from 'react';
import MaterialIcon from '/client/sharedcomponents/MaterialIcon';
import { NavbarItem } from '/client/materialize';
import { getUser } from '/lib/users.js';

export default class NewEmail extends React.Component {
  constructor(){
    super();

    this.default = {

    };

    this.state = {...this.default};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    $('.emailtemplateselect').material_select();
  }

  handleSubmit( event ){
    event.preventDefault();
    const template = this.refs.template.value;
    Meteor.call("newEmail",
			template,
			this.getFrom( template ),
			tos[template],
			function(error, result){
				if(!!error){
					Materialize.toast("Something went wrong. Please try again.", 5000);
					console.error(error);
				} else{
					FlowRouter.go("/emails/workspace/"+result);
				}
			});
  }

  render(){
    const options = this.getOptions();
    return (
      <form>
        <NavbarItem>|</NavbarItem>
        <NavbarItem>
          <select className="emailtemplateselect black-text" ref="template">
            {Object.keys(options).map( ( key ) => {
              return <option key={key} value={key}>{options[key]}</option>
            })}
          </select>
        </NavbarItem>
        <NavbarItem onClick={this.handleSubmit} tooltip={{text: "Create new email based on selected template"}}>
          <MaterialIcon className="black-text" icon="add" />
        </NavbarItem>
      </form>
    )
  }

  // Check various permissions to see which templates are
  // available to the current user
  getOptions() {
    let options = {};
    if ( checkPermission('ivrep') ) {
      options.newsletter = "Newsletter";
    }
    if ( getUser(Meteor.userId()).isPrayerGroupLeader ) {
      options.prayergroup = "Prayer Group";
    }
    return options;
  }

  getFrom( template ){

    if ( template == "newsletter" ) {
      return "InterVarsity Christian Fellowship <ivcf@rit.edu>";
    }

    if ( template == "prayergroup" ) {
      return getUser(Meteor.userId()).getEmail();
    }

    throw "No valid template provided.";
  }

}

const tos = {
  newsletter: {
    users: [],
    groups: ["newsletter"],
    emails: []
  },
  prayergroup: {
    users: [],
    groups: ["prayergroup"],
    emails: []
  }
};
