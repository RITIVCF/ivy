import React from 'react';
import SignInButtonWrapper from '/client/user/SignInButtonWrapper.jsx';



// <nav className="navbar navbar-default nabar-cls-top" role="navigation" style={margin-bottom: "0"} >
// <img src="images/userpics/account.png" class="img-thumbnail" />
// Print user's Name here

export var MainLayout = ({content}) => (   // export const MainLayout
	<div className="wrapper">
				<nav className="navbar navbar-default navbar-fixed-top" >
					<div className="container-fluid">
						<div className="navbar-header">
	                <button type="button" className="navbar-toggle collapsed"
										data-toggle="collapse" aria-expanded="false"
										data-target="#bs-example-navbar-collapse-1">
	                    <span className="sr-only">Toggle navigation</span>
	                    <span className="icon-bar"></span>
	                    <span className="icon-bar"></span>
	                    <span className="icon-bar"></span>
	                </button>
	                <a className="navbar-brand" href="/">Ivy</a>
	            </div>
							<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
								<ul className="nav navbar-nav">
									<li className="dropdown">
          					<a href="#" className="dropdown-toggle"
											data-toggle="dropdown" role="button"
											aria-haspopup="true" aria-expanded="false">
											Events
											<span className="caret"></span>
										</a>
										<ul className="dropdown-menu">
											{checkPermission("events")?
												<li>
													<a href="/events">Event Dashboard</a>
												</li>:""}
												<li role="separator" className="divider"></li>
												<li>
													<a href="/calendar">Event Calendar</a>
												</li>
										</ul>
									</li>

										{checkPermission("churches")?
											<li>
												<a href="/churches">Churches Dashboard</a>
											</li>:""}
										{checkPermission("tickets")?
											<li>
												<a href="/tickets">Ticket Dashboard</a>
											</li>:""}
										{/*}<li>
											<a href="/groups">Group Admin</a>
										</li>*/}
										{checkPermission("admin")?
											<li>
												<a href="/admin">Admin Dashboard</a>
											</li>:""}
										{checkPermission("contacts")?
											<li>
												<a href="/contacts">Contact Dashboard</a>
											</li>:""}
										{/*<li>
											<a href="/sg">Small Groups Dashboard</a>
										</li>*/}
										{checkPermission("attendance")?
											<li>
												<a href="/attendance">Attendance Dashboard</a>
											</li>:""}




										<li className="dropdown">
	          					<a href="#" className="dropdown-toggle"
												data-toggle="dropdown" role="button"
												aria-haspopup="true" aria-expanded="false">
													{Meteor.user()?Meteor.user().username:"User"}
												<span className="caret"></span>
											</a>
											<ul className="dropdown-menu">
													<li>
														<a href="/profile">My Profile</a>
													</li>
													<li role="separator" className="divider"></li>
													<li>
														<a href="/changepassword">Change Password</a>
													</li>
													<li>
														<SignInButtonWrapper />
													</li>
											</ul>
										</li>
								</ul>
							</div>


					</div>
				</nav>


        <main style={{paddingTop: '50px'}}>
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
