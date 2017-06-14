import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class NavItem extends TrackerReact(Component) {
	constructor(){
		super();
		this.go = this.go.bind(this);
	}

	componentDidMount(){
		$('.collapsible').collapsible();
	}

	componentDidUpdate(){
		$('.collapsible').collapsible();
	}

	go(){
		FlowRouter.go(FlowRouter.path(this.props.item.id));
	}

	renderDropdown(){
		let item = this.props.item;
		return (
			<li className="no-padding">
				<ul className="collapsible collapsible-accordion">
					<li>
						<a className="collapsible-header">
							<span className="nav-icon">
								<i className="material-icons">{item.icon}</i>
							</span>
							<span className="nav-label">{item.text}</span>
							<i id="drop-nav" className="material-icons right">arrow_drop_down</i>
						</a>
						<div className="collapsible-body">
							<ul className="custom-collapsible">
								{item.children.map((child)=>{
									return <NavItem key={child.id} item={child}
										isChild={true}
										isActive={FlowRouter.current().route.group.name==item.id} />
								})}
							</ul>
						</div>
					</li>
				</ul>
			</li>
		)
	}

	renderChild(){
		let item = this.props.item;
		let isActive = this.props.isActive;
		console.log("Group parent", FlowRouter.current().route.group.parent);
		return (
			<li className={isActive?"active":""}>
				<a onClick={this.go}>
					<i className="material-icons">{item.icon}</i>{item.text}
				</a>
			</li>
		)
	}

	renderItem(){
		let item = this.props.item;
		let isActive = this.props.isActive;
		return (
			<li className={isActive?"active":""}>
				<a onClick={this.go} className="waves-effect collapsible-header">
					<span className="nav-icon">
						<i className="material-icons">{item.icon}</i>
					</span>
					<span className="nav-label">{item.text}</span>
				</a>
			</li>
		)
	}

	render(){
		let item = this.props.item;
		let isChild = this.props.isChild;

		//Permission exists
		if(item.permission){
			if(!checkPermission(item.permission)){
				// User does not have permission, do not render this navItem.
				return false
			}
		}

		// No permission or permission allowed
		if(isChild){
			return this.renderChild();
		}
		if(item.children.length > 0){
			return this.renderDropdown()
		}
		else{
			return this.renderItem()
		}
	}
}
