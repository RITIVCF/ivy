import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import MaterialCollapsible from '/client/sharedcomponents/MaterialCollapsible/MaterialCollapsible.jsx';
import DropdownButton from '/client/sharedcomponents/DropdownButton/DropdownButton.jsx';
import ModuleForm from '/client/email/workspace/ModuleForm.jsx';
import EmailModule from '/lib/classes/EmailModule.js';

export default class EmailWorkspacePanel extends TrackerReact(React.Component){
  constructor(props) {
    super(props);

    this.state = {

    };

		this.addCustomModule = this.addCustomModule.bind(this);
		this.moveModuleUp = this.moveModuleUp.bind(this);
		this.moveModuleDown = this.moveModuleDown.bind(this);

  }

	addCustomModule(layoutValue){
		Meteor.call("addCustomModule", this.props.email._id, layoutValue);
	}

  componentWillUnmount() {

  }

	getLayouts(){
		let layouts = [];
		Options.findOne("emaillayouts").vals.forEach( (layout) => {
			if(layout.isUserAccessible){
				layouts.push({text: layout.name, arg: layout.value});
			}
		});
		return layouts;
	}

	getModuleOptions(){
		return this.moduleOptions;
	}

	getSections(){
		let emid = this.getEmail()._id;
		let sections = [];
		this.getEmail().modules.map( (module, i) => {
			let emailModule = new EmailModule(module);
			let section = {
				header: emailModule.getModuleName(),
				leftIcon: {
					icon: "keyboard_arrow_up",
					action: () => {this.moveModuleUp(i)}
				},
				rightIcon: {
					icon: "keyboard_arrow_down",
					action: () => {this.moveModuleDown(i)}
				},
				content: <ModuleForm emid={emid} module={emailModule} />
			};
			sections.push(section);
		});
		return sections;
	}

	getEmail(){
		return this.props.email;
	}

	moveModuleUp(index){
		let emid = this.getEmail()._id;
		Meteor.call("moveModuleUp", emid, index);
		$('.collapsible-header').removeClass("active");

	}

	moveModuleDown(index){
		let emid = this.getEmail()._id;
		Meteor.call("moveModuleDown", emid, index);
		$('.collapsible-header').removeClass("active");
	}

	removeModule(){
		// let modules = this.props.email.modules;
		// modules.splice(module.props.i, 1);
		// Meteor.call("setModules", this.props.email._id, modules);
	}

  render() {
		let email = this.getEmail();
		let sections = this.getSections();
		let layouts = this.getLayouts();

    return (
			<div>
				<div className="col s12">
					<h5>Email Modules:
						<DropdownButton
							id={"selectEmailModule"}
							icon="add"
							options={layouts}
							action={this.addCustomModule}
						/>
					</h5>
				</div>
				<MaterialCollapsible
					type="accordion"
					id="emailworkspace"
          style={{margin: "0 -15px", border: "0"}}
					sections={sections} />
			</div>
    )
  }
}
