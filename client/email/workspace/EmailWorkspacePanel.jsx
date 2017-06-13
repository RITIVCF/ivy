import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import tinyMCE from '/client/sharedcomponents/tinyMCE.jsx';
import MaterialCollection from '/client/sharedcomponents/MaterialCollection/MaterialCollection.jsx';

export default class EmailWorkspacePanel extends TrackerReact(React.Component){
  constructor(props) {
    super(props);

		let email = this.getEmail(props.emid);
    console.log(email);
    this.state = {
      modules: email.modules,
			activeModule: 0
    };

  }

  componentWillUnmount() {

  }

	getEditorId(){
		return "emaileditor";
	}

	getModuleValues(){
		let moduleList = [];
		this.state.modules.map( (module) => {
			moduleList.push(module.type);
		});
		return moduleList;
	}

	getEmail(emid){
		if(!emid){
			emid = this.props.emid;
		}
		return Emails.findOne(emid);
	}

  render() {
		let id = this.getEditorId();
		let email = this.getEmail();
		let activeModule = this.state.activeModule;
		let moduleValues = this.getModuleValues();
    return (
			<div className="col s12">
				<tinyMCE id={id} content={email.content} />
				<MaterialCollection selected={activeModule} values={moduleValues} />
			</div>
    )
  }
}
