import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Random } from 'meteor/random';
import TinyMCE from '/client/sharedcomponents/TinyMCE.jsx';
import TextInput from '/client/sharedcomponents/TextInput.jsx';
import AutoComplete from '/client/sharedcomponents/AutoComplete.jsx';
import { Row, Column } from '/client/materialize.jsx';

export default class ModuleForm extends TrackerReact(React.Component){
  constructor(props) {
    super(props);

    this.state = {
			subscription: Meteor.subscribe("EmailWorkspaceEvents")
    };


		this.removeModule = this.removeModule.bind(this);
		this.updateDesc = this.updateDesc.bind(this);
		this.updateTitle = this.updateTitle.bind(this);
		this.handleTitleChange = _.debounce((title)=>{this.updateTitle(title)}, 1000);
		this.handleDescChange = _.throttle((desc)=>{this.updateDesc(desc)}, 1000);
		this.handleImageChange = _.debounce((url)=>{this.updateImage(url)}, 1000);
		this.handleURLChange = _.debounce((url)=>{this.updateURL(url)}, 1000);
		this.handleLabelChange = _.debounce((label)=>{this.updateLabel(label)});
		this.handleEventChoice = this.updateEventID.bind(this);
  }

	componentWillUnmount(){
		this.state.subscription.stop();
	}

	updateDesc(desc){
		Meteor.call("setModuleField", this.props.emid, this.props.module._id, "desc", desc);
	}

	updateTitle(title){
		Meteor.call("setModuleField", this.props.emid, this.props.module._id, "title", title);
	}

	updateImage(url){
		Meteor.call("setModuleField", this.props.emid, this.props.module._id, "img", url);
	}

	updateEvent(eid){
		Meteor.call("setModuleField", this.props.emid, this.props.module._id, "eid", eid);
	}

	updateURL(url){
		Meteor.call("setModuleField", this.props.emid, this.props.module._id, "url", url);
	}

	updateLabel(label){
		Meteor.call("setModuleField", this.props.emid, this.props.module._id, "label", label);
	}

	updateEventID(event){
		Meteor.call("setModuleField", this.props.emid, this.props.module._id, "eid", event._id);
	}

  getEventName(){
		const eid = this.props.module.getEventID();
		const event = Events.findOne(eid);

		if(!!event){
			return event.name;
		} else {
			return "";
		}
	}

	removeModule(){
		this.props.module.remove();
	}

  render() {
		const module = this.props.module;
		const isLabelEditable = module.isLabelEditable();
		const isTitleEditable = module.isTitleEditable();
		const isDescEditable = module.isDescEditable();
		const isEventEditable = module.isEventEditable();
		const isURLEditable = module.isURLEditable();
		const isImgEditable = module.isImgEditable();
		const eventName = this.getEventName();
		const id = module._id;
    return (
			<Row>
				<Column>
					{isLabelEditable &&
						<TextInput id={id+"_label"}
							label="Module Label"
							onChange={this.handleLabelChange}
							defaultValue={module.getLabel()}
						/>
					}
					{isTitleEditable &&
						<TextInput
							id={id+"_title"}
							multi={true}
							label={module.getLayout()=="cta"?"Title":"Header"}
							onChange={this.handleTitleChange}
							defaultValue={module.getTitle()}
						/>
					}
					{isDescEditable &&
						<TinyMCE
							id={id+"_desc"}
							content={module.desc}
							onChange={this.handleDescChange}
						/>
					}
					{isEventEditable &&
						<AutoComplete
							id="eid"
							ref="eid"
							find={Events.find}
							initialValue={eventName}
							unset={()=>{}}
							label="Event Name"
							onSuggestionSelected={this.handleEventChoice}
							renderSuggestion={renderSuggestion}
						/>
					}
					{isImgEditable &&
						<TextInput
							id={id+"_img"}
							label="Image URL"
							onChange={this.handleImageChange}
							defaultValue={module.getImageURL()}
						/>
					}
					{isURLEditable &&
						<TextInput
							id={id+"_url"}
							label="Action URL"
							onChange={this.handleURLChange}
							defaultValue={module.getActionURL()}
						/>
					}
					<Button onClick={this.removeModule} color={"red"} >
						Remove
					</Button>
				</Column>
			</Row>
    )
  }
}


function renderSuggestion(suggestion) {
  return (
      <span>{suggestion.name}
        <span style={{float: "right"}}>
					{new moment(suggestion.start.toISOString()).format("ddd MMM Do")}
				</span>
      </span>

  );
}
