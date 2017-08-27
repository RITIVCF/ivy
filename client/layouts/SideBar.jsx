import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import SignInButtonWrapper from '/client/user/SignInButtonWrapper.jsx';
import Footer from './Footer.jsx';

export default class SideBar extends TrackerReact(React.Component) {
	constructor(){
		super();

		this.state = {
			navCollapsed: false
		}

	}

	componentDidMount(){
		$('.collapsible').collapsible();
	}

	componentDidUpdate(){
		$('.collapsible').collapsible();
	}

	toggleCollapse(){
		this.setState({navCollapsed:!this.state.navCollapsed});
		setTimeout(function() {
			$('main').toggleClass('nav-collapsed');

			$('#nav-collapse-button').toggleClass('nav-collapsed');

			$('.hide-scroll').toggleClass('nav-collapsed');
    }, this.state.navCollapsed?0:200);
		setTimeout(function() {

    }, this.state.navCollapsed?200:0);
	}



	render(){
		let children = this.props.children;
		return(
		<div className="hide-scroll z-depth-1 hide-on-med-and-down">
		<ul id="side-nav" className="side-nav z-depth-1 fixed" >

			{children}

			<li id="toggleCollapse">
				<a className="waves-effect collapsible-header" onClick={this.toggleCollapse.bind(this)}>
					<span className="nav-icon">
						<i id="nav-collapse-button" className="material-icons">play_circle_filled</i>
					</span>
					<span className="nav-label">Collapse</span>
				</a>
			</li>
		</ul>
		<Footer />
	</div>

		)

	}
}
