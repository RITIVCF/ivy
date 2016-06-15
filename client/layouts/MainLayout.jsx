import React from 'react';
import AccountsUIWrapper from '../AccountsUIWrapper.jsx';

// <nav className="navbar navbar-default nabar-cls-top" role="navigation" style={margin-bottom: "0"} >
// <img src="images/userpics/account.png" class="img-thumbnail" />
// Print user's Name here

export const MainLayout = ({content}) => (
	<div className="wrapper">
				<nav className="navbar navbar-default" >
					<div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target=".sidebar-collapse">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="/">Ivy: IVCF Webman</a>
            </div>
						<ul className="nav navbar-nav" id="main-menu">
                <li>
									<a href="/events">Events Dashboard</a>
								</li>
								<li>
									<a href="/calendar">Event Calendar</a>
								</li>
								<li>
									<a href="/churches">Churches Dashboard</a>
								</li>
								<li>
									<a href="/sg">Small Groups Dashboard</a>
								</li>
								<li>
									<a href="/attendance">Attendance</a>
								</li>
						</ul>
					<div className="header-right">
						<AccountsUIWrapper />
					</div>
				</nav>


        <main>
		    {content}
        </main>
				<footer>
				</footer>
	</div>
)

/*}
	<div className=""
		<nav id="nav">
			<ul>
				<li><AccountsUIWrapper /></li>
				{/*<li class="current"><a href="/forms/contact">Select Contact Form</a></li>
				<li class="current"><a href="/ethnicity">Add Ethnicity</a></li>}
				<li className="current"><a href="/events">Events Dashboard</a></li>
				<li className="current"><a href="/calendar">Event Calendar</a></li>
				<li className="current"><a href="/churches">Churches Dashboard</a></li>
				<li className="current"><a href="/sg">Small Groups Dashboard</a></li>
			</ul>
		</nav>
	*/
