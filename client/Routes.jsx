import React from 'react';
import {mount} from 'react-mounter';
import LZString from 'lz-string';

//Layouts
import {MainLayout} from './layouts/MainLayout.jsx';
import {FormLayout} from './layouts/FormLayout.jsx';
import {BlankLayout} from './layouts/BlankLayout.jsx';
import {EmailTemplateViewLayout} from '/client/layouts/EmailTemplateViewLayout.jsx';
import {ErrorLayout} from './layouts/ErrorLayout.jsx';

//Wrappers
// ****    Error Page  ********
import ErrorPage from './layouts/ErrorPage.jsx';
// ****************************

// *****    Dashboard *********
import DashboardWrapper from './Dashboard.jsx';
// ****************************

// ***** People  **************
import ContactProfileWrapper from './contact/ContactProfileWrapper.jsx';
import ContactWrapper from './contact/ContactWrapper.jsx';
import NewContactWrapper from './contact/forms/NewContactWrapper.jsx';
// ****************************

// ****  Events   *********
import EventWorkspaceWrapper from './event/EventWorkspaceWrapper.jsx';
import EventOld from './event/EventOld.jsx';
import EventCalendarWrapper from './event/EventCalendarWrapper.jsx';
import SigninWrapper from './event/forms/SignInWrapper.jsx';
import RSVPWrapper from './event/forms/RSVP.jsx';
// ****   Debriefs  *******
import EventsDebriefWrapper from './event/debrief/EventsDebriefWrapper.jsx';
import EventsDebriefsWrapper from './event/debrief/EventsDebriefsWrapper.jsx';
import DebriefCreationWrapper from './event/debrief/DebriefCreationWrapper.jsx';
// ************************

// *****  Sign in & Account  **********
import UserProfileWrapper from './user/UserProfileWrapper.jsx';
import LoginWrapper from './user/LoginWrapper.jsx';
import SignUpWrapper from './user/SignUpWrapper.jsx';
import SelectContactWrapper from './user/SelectContactWrapper.jsx';
import ForgotPassword from './user/ForgotPassword.jsx';
//import NewContactWrapper from './user/NewContactWrapper.jsx';
import ChangePassword from './user/ChangePassword.jsx';
// ************************************

import EthnicityWrapper from './ethnicity/EthnicityWrapper.jsx';

import MemberWrapper from './member/MemberWrapper.jsx';

// *****   Churches   ********
import ChurchesWrapper from './churches/ChurchesWrapper.jsx';
import ChurchesWorkspace from './churches/ChurchesWorkspace.jsx';
import ChurchesOld from './churches/ChurchesOld.jsx';
// ***************************

// ****    My SG  *********
import MySmallGroupWrapper from './sgroups/MySmallGroupWrapper.jsx';
// ************************

// ****    Attendance   *******
import AttendanceContainer from './attendance/AttendanceContainer.jsx';
// ****************************

// ****    Tickets     ********
import TicketWrapper from './tickets/TicketWrapper.jsx';
import EditTicketWrapper from './tickets/EditTicketWrapper.jsx';
// ****************************

// ****    Admin     **********
import AdminDashboard from './admin/AdminDashboard.jsx';
import PagePermissionsWrapper from './admin/pages/PagePermissionsWrapper.jsx';
import SiteSettingsWrapper from './admin/options/SiteSettingsWrapper.jsx';
import UserManagementWrapper from './admin/users/UserManagementWrapper.jsx';
import FeedbackWrapper from './feedback/FeedbackWrapper.jsx';
import DuplicateContactWrapper from './admin/dupcontacts/DuplicateContactWrapper.jsx';
import OverviewWrapper from './admin/overview/OverviewWrapper.jsx';
import JobManagerWrapper from '/client/jobs/JobManagerWrapper.jsx';
//*****************************

// ****   Groups   ********
import GroupsWrapper from './groups/GroupsWrapper.jsx';
// ************************

// ****  Email  ***************
import EmailWrapper from './email/summary/EmailWrapper.jsx';
import EmailWorkspaceWrapper from './email/workspace/EmailWorkspaceWrapper.jsx';
import UnsubscribeForm from './email/UnsubscribeForm.jsx'
// ****************************

// **** Prayer Group **********
import PrayerGroupJoinLanding from '/client/prayergroup/PrayerGroupJoinLanding';
import PrayerGroupPortal from '/client/prayergroup/PrayerGroupPortal';
// ****************************

// **** Forms  ***************
import FormWrapper from './forms/FormWrapper.jsx';
// ****************************


function signInForceCheck(context) {
	const exclude = ["public", "unsubscribe"];
	if(!exclude.includes(context.route.group.name)){
		if(!Meteor.userId()){
			routeTo('login', {}, {r: context.path});
		}
	}
}

function removeTooltips(){
	$('.tooltipped').tooltip('remove');
}

function subscribeContactSelf(){
	Meteor.subscribe("contact");
}

FlowRouter.triggers.enter([signInForceCheck]);
FlowRouter.triggers.exit([removeTooltips]);


let dashboardRoute = FlowRouter.group({
	prefix: "/",
	name: "dashboard"
});

dashboardRoute.route('/',{
	name: "dashboard",
	action() {
		const title = "Dashboard";
		setDocumentTitle(title);
		mount(MainLayout, {
			header: title,
			content: (<DashboardWrapper />)
		});
	}
});

const changePasswordRoute = FlowRouter.group({
	prefix: "/changepassword",
	name: "changepassword"
});

changePasswordRoute.route('/', {
	name: "changepassword",
	action() {
		const title = "My Account";
		setDocumentTitle(title);
		mount(MainLayout, {
			header: title,
			content: (<ChangePassword />)
		})
	}
});

let profileRoutes = FlowRouter.group({
	prefix: '/profile',
	name: "profile"
});

profileRoutes.route('/',{
	action() {
		const title = "My Profile";
		setDocumentTitle(title);
		mount(MainLayout, {
			header: title,
			content: (<UserProfileWrapper />)
		})
	}
});

//**** Admin Routes  *********

let adminRoutes = FlowRouter.group({
	prefix: "/admin",
	name: "admin"
})

adminRoutes.route('/', {
	action() {
		const title = "Administration";
		setDocumentTitle(title);
		mount(MainLayout, {
			header: title,
			content: (<AdminDashboard />)
		})
	}
});

 //****************************************
	let structuresRoutes = adminRoutes.group({
		prefix: "/structures",
		name: "structures"
	});

	structuresRoutes.route('/', {
		name: "structures",
		action() {
			const title = "Structures";
			setDocumentTitle(title);
			mount(MainLayout, {
				header: title,
				content: (<GroupsWrapper />)
			})
		}
	});
	//****************************************
	//****************************************
	let pagePermissionsRoutes = adminRoutes.group({
		prefix: "/pages",
		name: "pagepermissions"
	});

	pagePermissionsRoutes.route('/', {
		name: "pagepermissions",
		action() {
			const title = "Administration";
			setDocumentTitle(title);
			mount(MainLayout, {
				header: title,
				content: <PagePermissionsWrapper />
			})
		}
	});
	//****************************************
	//****************************************
	let settingRoutes = adminRoutes.group({
		prefix: "/settings",
		name: "settings"
	});

	settingRoutes.route('/', {
		name: "settings",
		action() {
			const title = "Chapter Settings";
			setDocumentTitle(title);
			mount(MainLayout, {
				header: title,
				content: <SiteSettingsWrapper />
			})
		}
	});
	//****************************************
	//****************************************
	let duplicateContactsRoutes = adminRoutes.group({
		prefix: "/duplicatecontacts",
		name: "duplicatecontacts"
	});

	duplicateContactsRoutes.route('/', {
		name: "duplicatecontacts",
		action() {
			const title = "Duplicate Contacts";
			setDocumentTitle(title);
			mount(MainLayout, {
				header: title,
				content: <DuplicateContactWrapper />
			})
		}
	});
	//****************************************
	//****************************************
	let overviewRoutes = adminRoutes.group({
		prefix: "/overview",
		name: "overview"
	});

	overviewRoutes.route('/', {
		name: "overview",
		action() {
			const title = "Chapter Overview";
			setDocumentTitle(title);
			mount(MainLayout, {
				header: title,
				content: <OverviewWrapper />
			})
		}
	});
	//****************************************
	//****************************************
 	let jobmanagerRoutes = adminRoutes.group({
 		prefix: "/jobmanager",
 		name: "jobmanager"
 	});

 	jobmanagerRoutes.route('/', {
 		name: "jobmanager",
 		action() {
			const title = "Job Manager";
			setDocumentTitle(title);
 			mount(MainLayout, {
 				header: title,
 				content: (<JobManagerWrapper />)
 			})
 		}
 	});
 	//****************************************

// *********   ./ Admin Routes     ***********
// ***********   People Routes   *************

let peopleRoutes = FlowRouter.group({
	prefix: "/people",
	name: "people"
});

peopleRoutes.route('/', {
	name: "people",
	action(){
		const title = "People";
		setDocumentTitle(title);
		mount(MainLayout, {
			header: title,
			content: (<ContactWrapper />)
		})
	}
});

peopleRoutes.route('/new', {
	name: "newcontactform",
	action() {
		const title = "New Contact";
		setDocumentTitle(title);
		mount(FormLayout, {
			content: <NewContactWrapper />
		})
	}
});

peopleRoutes.route('/:cid',{
	action(params) {
		const title = "People";
		setDocumentTitle(title);
		mount(MainLayout, {
			header: title,
			content: (<ContactProfileWrapper cid={params.cid} />)
		})
	}
});



//********** ./ People Routes ***********

// ***********   Public Routes   **********

let publicRoutes = FlowRouter.group({
	prefix: "/public",
	name: "public"
});

publicRoutes.route('/newcontact', {
	name: "publicnewcontact",
	action(){
		const title = "New Contact";
		setDocumentTitle(title);
		mount(FormLayout, {
			content: (<NewContactWrapper route={"signup"} />)
		})
	}
});

publicRoutes.route('/login', {
	name: "login",
	action(params, queryParams) {
		const title = "Log In";
		setDocumentTitle(title);
		mount(FormLayout,  {
			content: (<LoginWrapper route={queryParams.r} />)
		})
	},
	triggersExit: [subscribeContactSelf]
});

publicRoutes.route('/signup', {
	name: "signupform",
	action() {
		const title = "Sign Up";
		setDocumentTitle(title);
		mount(FormLayout, {
			content: (<SelectContactWrapper />)
		})
	}
});

publicRoutes.route('/signup/:t', {
	name: "signup",
	action(params) {
		const title = "Create Password";
		setDocumentTitle(title);
		mount(FormLayout, {
			content: (<SignUpWrapper token={params.t}/>)
		})
	},
	triggersExit: [subscribeContactSelf]
});

publicRoutes.route('/forgotpassword/:token', {
	action(params) {
		const title = "Reset Password";
		setDocumentTitle(title);
		mount(FormLayout, {
			content: (<ForgotPassword token={params.token} />)
		})
	}
});

publicRoutes.route('/forgotpassword', {
	name: "forgotpasswordform",
	action() {
		const title = "Forgot Password";
		setDocumentTitle(title);
		mount(FormLayout, {
			content: (<ForgotPassword />)
		})
	}
});

//********** ./ Public Routes ***********

// FlowRouter.route('/mysg', {
// 	action() {
// 		mount(MainLayout, {
// 			header: "My Small Group",
// 			content: (<MySmallGroupWrapper />)
// 		})
// 	}
// });

// ***********   Events Routes   **********
let eventsRoutes = FlowRouter.group({
	prefix: "/events",
	name: "events"
});

eventsRoutes.route('/', {
	name: "events",
	action() {
		const title = "Events";
		setDocumentTitle(title + " Calendar");
		mount(MainLayout, {
			header: title,
			content: (<EventCalendarWrapper />)
		})
	}
});

eventsRoutes.route('/attendance/:eid',{
	name: "eventattendance",
	action(params) {
		const title = "Attendance";
		setDocumentTitle(title);
		mount(MainLayout, {
			header: title,
			content: (<AttendanceContainer eid={params.eid} />)
		})
	}
});


eventsRoutes.route('/workspace/:eid',{
	name: "workspace",
	action(params) {
		const title = "Event Workspace";
		setDocumentTitle(title);
		mount(MainLayout, {
			header: title,
			content: (<EventWorkspaceWrapper eid={params.eid} />)
		})
	}
});

eventsRoutes.route('/servicerequests/:aord/:eid/:jid',{
	action(params) {
		if(params.aord=="accept"){
			Meteor.call("acceptJobRequest", params.eid, params.jid);
		}
		else{
			Meteor.call("declineJobRequest", params.eid, params.jid);
		}
		FlowRouter.go("/");
	}
});

eventsRoutes.route("/workspace/:vore/:eid/:uid",{
	action(params) {
		Meteor.call("getEvent", params.eid, function(error,result){
			if(result){
				let ev = result;
				if(Meteor.userId()==ev.owner){
					Meteor.call("addEventUserPerm",params.eid,params.uid);
					if(params.vore=="edit"){
						Meteor.call("updateEventUserPerm", params.eid, params.uid, true );
					}
					FlowRouter.go("/");
				}else{
					FlowRouter.go("/event/workspace/"+params.vore+"/"+params.eid+"/"+params.uid);
				}
			}
		});

	}
});

	// *******      Debrief Routes  *************

	let debriefRoutes = eventsRoutes.group({
		prefix: "/debrief",
		name: "debreif"
	});

	debriefRoutes.route('/',{
		name: "debriefssummary",
		action(params) {
			const title = "Event Debriefs";
			setDocumentTitle(title);
			mount(MainLayout, {
				header: title,
				content: (<EventsDebriefsWrapper />)
			})
		}
	});

	debriefRoutes.route('/view/:eid',{
		name: "viewdebrief",
		action(params) {
			const title = "Event Debrief";
			setDocumentTitle(title);
			mount(MainLayout, {
				header: title,
				content: (<EventsDebriefWrapper eid={params.eid} />)
			})
		}
	});

	debriefRoutes.route('/edit/:eid',{
		name: "editdebrief",
		action(params) {
			const title = "Edit Event Debrief";
			setDocumentTitle(title);
			mount(MainLayout, {
				header: title,
				content: (<EventsDebriefWrapper eid={params.eid} edit={true} />)
			})
		}
	});


	debriefRoutes.route('/edit',{
		name: "editdebriefquestions",
		action(){
			const title = "Set Debrief Questions";
			setDocumentTitle(title);
			mount(MainLayout, {
				header: title,
				content: (<DebriefCreationWrapper />)
			})
		}
	});

	// *******   ./ Debrief Routes  *************

// *******   ./ Events Routes  *************

// *******    Tickets Routes   **************

let ticketsRoutes = FlowRouter.group({
	prefix: "/tickets",
	name: "tickets"
});

ticketsRoutes.route('/',{
	name: "tickets",
	action() {
		const title = "To-Dos";
		setDocumentTitle(title);
		mount(MainLayout, {
			header: title,
			content: (<TicketWrapper />)
		})
	}
});

ticketsRoutes.route('/:tid',{
	action(params) {
		const title = "To-Dos";
		setDocumentTitle(title);
		mount(MainLayout, {
			header: title,
			content: (<EditTicketWrapper tid={params.tid} />)
		})
	}
});

// ****** ./ Tickets Routes    *************

// *******  Churches Routes  ****************
let churchesRoutes = FlowRouter.group({
	prefix: "/churches",
	name: "churches"
});

churchesRoutes.route('/',{
	name:"churches",
	action() {
		const title = "Churches";
		setDocumentTitle(title);
		mount(MainLayout, {
			header: title,
			content: (<ChurchesWrapper />)
		})
	}
});

// *******  ./ Churches Routes  *************

// *******  Emails Routes   *****************

let emailsRoutes = FlowRouter.group({
	prefix: "/emails",
	name: "emails"
});

emailsRoutes.route('/',{
	name: "emails",
	action(){
		const title = "Emails";
		setDocumentTitle(title);
		mount(MainLayout, {
			header: title,
			content: (<EmailWrapper />)
		})
	}
});

emailsRoutes.route('/workspace/:emid',{
	name: "emailworkspace",
	action(params){
		const title = "Email Workspace";
		setDocumentTitle(title);
		mount(MainLayout, {
			header: title,
			content: (<EmailWorkspaceWrapper emid={params.emid} />)
		})
	}
});

// *******  ./ Emails Routes  **********

const formRoutes = FlowRouter.group({
	prefix: "/forms",
	name: "forms"
});

formRoutes.route('/signin/:eid', {
	name: "signinform",
	action(params) {
		const title = "Welcome to InterVarsity";
		setDocumentTitle(title);
		mount(FormLayout, {
				content: (<SigninWrapper eid={params.eid} />)
			}
		)
	}
});

// FlowRouter.route('/forms/rsvp/:eid', {
// 	name: "rsvpform",
// 	action(params) {
// 		mount(FormLayout, {
// 				content: (<RSVPWrapper eid={params.eid} />)
// 			}
// 		)
// 	}
// });

const emailrenderRoutes = FlowRouter.group({
	prefix: "/emailrender",
	name: "emailrender"
});

emailrenderRoutes.route('/:compressedHTML', {
	name: "emailrender",
	action(params) {
		var decompressedHTML = LZString.decompressFromEncodedURIComponent(params.compressedHTML);
		mount(BlankLayout, {
			content: (decompressedHTML)
		})
	}
});


const unsubRoutes = FlowRouter.group({
	prefix: "/unsubscribe",
	name: "unsubscribe"
});

unsubRoutes.route('/:subid', {
	name: "unsubscribe",
	action(params) {
		var uid = LZString.decompressFromEncodedURIComponent(params.subid);
		Meteor.call("updateNewsletter", uid, false);
		mount(FormLayout, {
				content: (<UnsubscribeForm token={params.subid} />)
			}
		)
	}
});

let prayerGroupRoutes = FlowRouter.group({
	prefix: '/prayergroup',
	name: 'prayergroup'
});

prayerGroupRoutes.route('/', {
	name: "prayergroupportal",
	action() {
		const title = "Prayer Portal";
		setDocumentTitle(title);
		mount(MainLayout, {
			header: title,
			content: ( <PrayerGroupPortal />)
		})
	}
});


prayerGroupRoutes.route('/join', {
	name: "prayergroupjoin",
	action( params ) {
		Meteor.call('joinPrayerGroup', function(err) {
			let status = "success";
			if (err) {
				status = "error";
			}
			mount(FormLayout, {
				content: ( <PrayerGroupJoinLanding status={status} />)
			});
		});
		mount(FormLayout, {
			content: ( <PrayerGroupJoinLanding status={"pending"} />)
		});
	}
});

FlowRouter.notFound = {
  action() {
		const title = "Page Not Found";
		setDocumentTitle(title);
    mount(ErrorLayout, {
				content: (<ErrorPage />)
			}
		)
  }
};
