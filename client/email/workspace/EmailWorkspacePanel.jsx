import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import TinyMCE from '/client/sharedcomponents/TinyMCE.jsx';
import MaterialCollection from '/client/sharedcomponents/MaterialCollection/MaterialCollection.jsx';
import DropdownButton from '/client/sharedcomponents/DropdownButton/DropdownButton.jsx';

export default class EmailWorkspacePanel extends TrackerReact(React.Component){
  constructor(props) {
    super(props);

		let email = props.email;
		let validModules = [
			"custom",
			"intro",
			"eventpromotion"
		];

    this.state = {
			validModules: validModules,
			activeModule: false
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
			},
			{
				text: "Header",
				arg: "header"
			},
			{
				text: "Social Media",
				arg: "socialmedia"
			},
			{
				text: "Small Group",
				arg: "smallgroup"
			},
			{
				text: "Large Group",
				arg: "largegroup"
			},
			{
				text: "NSO",
				arg: "nso"
			},
			{
				text: "Social Events",
				arg: "social"
			},
			{
				text: "Prayer",
				arg: "prayer"
			},
			{
				text: "Get Involved",
				arg: "getinvolved"
			},
			{
				text: "Become a Member",
				arg: "becomeamember"
			},
			{
				text: "Conference",
				arg: "conference"
			},
			{
				text: "Core",
				arg: "core"
			}
		];

		this.selectModule = this.selectModule.bind(this);
		this.removeModule = this.removeModule.bind(this);
		this.handleChange = this.handleChange.bind(this);
  }

	addModule(moduleType){
		Meteor.call("addModule", this.props.email._id, moduleType, ()=>{
			// Make the new module active
			this.setState({activeModule: this.props.email.modules.length});
		});
	}

	handleChange(i, desc){
		// Call function that does the changing of stu
		this.setState({})
		Meteor.call("setModuleDesc", this.props.email._id, i, desc);
	}

  componentWillUnmount() {

  }

	getModuleOptions(){
		return this.moduleOptions;
	}

	isModuleSelected(){
		let module = this.props.email.modules[this.state.activeModule];
		let moduleType = "";
		if(!!module){
			moduleType = module.type;
		}
		return this.state.validModules.includes(moduleType);
	}

	getEditorId(){
		return this.state.activeModule;
	}

	getModuleValues(){
		let types = Options.findOne("emailtypes");
		let moduleList = [];
		this.props.email.modules.forEach( (module) => {

			moduleList.push(module.type);
		});
		return moduleList;
	}

	getEmail(){
		// if(!emid){
		// 	emid = this.props.emid;
		// }
		// return Emails.findOne(emid);
		return this.props.email;
	}

	selectModule(i){
		this.setState({activeModule: i});
	}

	removeModule(module){
		let modules = this.props.email.modules;
		modules.splice(module.props.i, 1);
		Meteor.call("setModules", this.props.email._id, modules);
	}

  render() {
		let id = this.getEditorId();
		let email = this.getEmail();
		let activeModule = this.state.activeModule;
		let moduleValues = this.getModuleValues();
		let options = this.getModuleOptions();

    return (
			<div className="col s12">
				{this.isModuleSelected() && <TinyMCE id={id} content={email.modules[activeModule].desc} onChange={this.handleChange} />}
				<h5>Email Modules:
					<DropdownButton
						id={"selectEmailModule"}
						icon="add"
						options={options}
						action={this.addModule}
						/>
				</h5>
				<MaterialCollection
					selectedIndex={activeModule}
					values={moduleValues}
					onSelect={this.selectModule}
					icon="close"
					action={this.removeModule}
					  />
			</div>
    )
  }
}
