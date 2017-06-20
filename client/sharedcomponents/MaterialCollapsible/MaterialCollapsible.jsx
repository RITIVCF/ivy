import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import MaterialIcon from '/client/sharedcomponents/MaterialIcon.jsx';

export default class MaterialCollapsible extends TrackerReact(React.Component) {
  constructor(){
    super();

  }

	componentDidMount(){
		this.initializeCollapsible();
	}

	componentDidUpdate(){
		this.initializeCollapsible();
	}

	initializeCollapsible(){
		$('#'+this.getId()).collapsible();
	}

	getId(){
		if(!!this.props.id){
			return this.props.id;
		}
		else{
			return "MaterialCollapsible";
		}
	}



	render(){
		let type = this.props.type;
		let id = this.getId();
		let sections = this.props.sections;
		return (
			<ul id={id} className="collapsible" data-collapsible={type} >
				{sections.map( (section, i) => {
					return (
						<MaterialCollapsibleSection
							key={i}
							header={section.header}
							icon={section.icon}
							content={section.content} />
					)
				})}
			</ul>
		)
	}
}


class MaterialCollapsibleSection extends TrackerReact(React.Component) {
  constructor(){
    super();

  }

	render(){
		let header = this.props.header;
		let icon = this.props.icon;
		let content = this.props.content;
		return (
			<li>
				<div className="collapsible-header">
					{!!icon && <MaterialIcon icon={icon} />}
					{header}
				</div>
				<div className="collapsible-body">
					<span>
						{content}
					</span>
				</div>
			</li>
		)
	}
}
