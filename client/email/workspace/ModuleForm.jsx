import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Random } from 'meteor/random';
import TinyMCE from '/client/sharedcomponents/TinyMCE.jsx';
import TextInput from '/client/sharedcomponents/TextInput.jsx';

export default class ModuleForm extends TrackerReact(React.Component){
  constructor(props) {
    super(props);

    this.state = {

    };

		this.removeModule = this.removeModule.bind(this);
		this.updateDesc = this.updateDesc.bind(this);
		this.updateTitle = this.updateTitle.bind(this);
		this.handleTitleChange = _.throttle((title)=>{this.updateTitle(title)}, 1000);
		this.handleDescChange = _.throttle((desc)=>{this.updateDesc(desc)}, 1000);
  }

	updateDesc(desc){
		Meteor.call("setModuleField", this.props.emid, this.props.module._id, "desc", desc);
	}

	updateTitle(title){
		Meteor.call("setModuleField", this.props.emid, this.props.module._id, "title", title);
	}

  componentWillUnmount() {

  }

	removeModule(){
		this.props.module.remove();
	}

  render() {
		let module = this.props.module;
		let isTitleEditable = module.isTitleEditable();
		let isDescEditable = module.isDescEditable();
		let id = module._id;
    return (
			<div className="row">
				<div className="col s12">
					{isTitleEditable && <TextInput id={id} label="Title" onChange={this.handleTitleChange} defaultValue={module.getTitle()} />}
					{isDescEditable && <TinyMCE id={id} content={module.desc} onChange={this.handleDescChange} />}
				</div>
			</div>
    )
  }
}
