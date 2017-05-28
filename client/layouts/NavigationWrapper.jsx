import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import SideBar from './SideBar.jsx';
import SideBarMobile from './SideBarMobile.jsx';
import NavItem from './NavItem.jsx';

export default class NavigationWrapper extends TrackerReact(React.Component) {
	constructor(){
		super();

	}

	getNavItemsOption(){
		return Options.findOne("navitems");
	}

	getActiveStatus(item){
		return FlowRouter.current().route.group.name==item.id;
	}


	render(){
		let option = this.getNavItemsOption();
		if(!option){
			return false;
		}
		let items = [];
		option.items.map((item)=>{
			items.push(<NavItem key={item.id}
					item={item}
					isActive={this.getActiveStatus(item)}
				/>);
		})
		return(
			<div>
				<SideBar children={items} />
				<SideBarMobile children={items} />
			</div>
		)

	}
}
