import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import MaterialCollapsible from '/client/sharedcomponents/MaterialCollapsible/MaterialCollapsible.jsx';
import DropdownButton from '/client/sharedcomponents/DropdownButton/DropdownButton.jsx';
import ModuleForm from '/client/email/workspace/ModuleForm.jsx';
import EmailModule from '/lib/classes/EmailModule.js';

export default class EmailWorkspacePanel extends TrackerReact(React.Component){
  constructor(props) {
    super(props);

		let email = props.email;

    this.state = {

    };

		this.addModule = this.addModule.bind(this);

		this.moduleOptions = [
			{
				text: "Custom",
				arg: "custom"
			},
			{
				text: "Event Promotion",
				arg: "eventpromotion"
			},
			{type: "divider"},
			{
				text: "Intro",
				arg: "intro"
			}
		];


  }

	addModule(moduleType){
		Meteor.call("addModule", this.props.email._id, moduleType);
	}

  componentWillUnmount() {

  }

	getModuleOptions(){
		return this.moduleOptions;
	}

	getSections(){
		let emid = this.getEmail()._id;
		let sections = [];
		this.getEmail().modules.map( (module) => {
			let emailModule = new EmailModule(module);
			let section = {
				header: emailModule.getModuleName(),
				icon: "close",
				content: <ModuleForm emid={emid} module={emailModule} />
			};
			sections.push(section);
		});
		return sections;
	}

	getEmail(){
		return this.props.email;
	}

	removeModule(module){
		let modules = this.props.email.modules;
		modules.splice(module.props.i, 1);
		Meteor.call("setModules", this.props.email._id, modules);
	}

  render() {
		let email = this.getEmail();
		let sections = this.getSections();
		let options = this.getModuleOptions();

    return (
			<div>
				<div className="col s12">
					<h5>Email Modules:
						<DropdownButton
							id={"selectEmailModule"}
							icon="add"
							options={options}
							action={this.addModule}
							/>
					</h5>
				</div>
				<MaterialCollapsible
					type="accordion"
					id="emailworkspace"
					sections={sections} />
			</div>
    )
  }
}
