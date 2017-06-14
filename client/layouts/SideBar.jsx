import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import SignInButtonWrapper from '/client/user/SignInButtonWrapper.jsx';
import Footer from './Footer.jsx';

export default class SideBar extends TrackerReact(React.Component) {
	constructor(){
		super();

		this.state = {
			navCollapsed: false,
			subscription: {

			}
		}


	}

	componentDidMount(){
		// $(".dropdown-button").dropdown({
		// 	alignment: 'right',
		// 	beloworigin: true
		// });
		$('.collapsible').collapsible();
	}

	componentDidUpdate(){
		// $(".dropdown-button").dropdown({
		// 	alignment: 'right',
		// 	belowOrigin: true
		// });
		$('.collapsible').collapsible();
	}

	toggleCollapse(){
		this.setState({navCollapsed:!this.state.navCollapsed});
		/*$('#adminfull').toggleClass('collapsible');
		$('#adminfull').toggleClass('collapsible-accordion');
		$('#adminfullheader').toggleClass('collapsible-header');
		$('#adminfullheader').toggleClass('dropdown-button');
		setTimeout(function() {
			if(this.state.navCollapsed) {
				$(".dropdown-button").dropdown({
					alignment: 'right',
					belowOrigin: true
				});
			} else {
				$('.collapsible').collapsible();
			}
		}, 500);*/
		setTimeout(function() {
			$('main').toggleClass('nav-collapsed');
			//$('.nav-label').toggleClass('nav-collapsed');
			$('#nav-collapse-button').toggleClass('nav-collapsed');
			//$('.side-nav').toggleClass('nav-collapsed');
			$('.hide-scroll').toggleClass('nav-collapsed');
    }, this.state.navCollapsed?0:200);
		setTimeout(function() {
      //$('#drop-nav').toggleClass('nav-collapsed');
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
