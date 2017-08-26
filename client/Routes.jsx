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
import AttendanceSummary from './attendance/AttendanceWrapper.jsx';
import EventDetailWrapper from './attendance/AttendanceWrapper.jsx';
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
//*****************************

// ****   Groups   ********
import GroupsWrapper from './groups/GroupsWrapper.jsx';
// ************************

// ****  Email  ***************
import EmailWrapper from './email/summary/EmailWrapper.jsx';
import EmailWorkspaceWrapper from './email/workspace/EmailWorkspaceWrapper.jsx';
import UnsubscribeForm from './email/UnsubscribeForm.jsx'
// ****************************

// **** Forms  ***************
import FormWrapper from './forms/FormWrapper.jsx';
// ****************************


function signInForceCheck(context) {
	const exclude = ["public", "unsubscribe"]
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
})

dashboardRoute.route('/',{
	name: "dashboard",
	action() {
		mount(MainLayout, {
			header: "Dashboard",
			content: (<DashboardWrapper />)
		})
	}
});

const changePasswordRoute = FlowRouter.group({
	prefix: "/changepassword",
	name: "changepassword"
});

changePasswordRoute.route('/', {
	name: "changepassword",
	action() {
		mount(MainLayout, {
			header: "My Account",
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
		mount(MainLayout, {
			header: "My Profile",
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
		mount(MainLayout, {
			header: "Administration",
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
			mount(MainLayout, {
				header: "Structures",
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
			mount(MainLayout, {
				header: "Administration",
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
			mount(MainLayout, {
				header: "Site Settings",
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
			mount(MainLayout, {
				header: "Duplicate Contacts",
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
			mount(MainLayout, {
				header: "Chapter Overview",
				content: <OverviewWrapper />
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
		mount(MainLayout, {
			header: "People",
			content: (<ContactWrapper />)
		})
	}
});

peopleRoutes.route('/new', {
	name: "newcontactform",
	action() {
		mount(FormLayout, {
			content: <NewContactWrapper />
		})
	}
});

peopleRoutes.route('/:cid',{
	action(params) {
		mount(MainLayout, {
			header: "People",
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
		mount(FormLayout, {
			content: (<NewContactWrapper route={"signup"} />)
		})
	}
});

publicRoutes.route('/login', {
	name: "login",
	action(params, queryParams) {
		mount(FormLayout,  {
			content: (<LoginWrapper route={queryParams.r} />)
		})
	},
	triggersExit: [subscribeContactSelf]
});

publicRoutes.route('/signup', {
	name: "signupform",
	action() {
		mount(FormLayout, {
			content: (<SelectContactWrapper />)
		})
	}
});

publicRoutes.route('/signup/:t', {
	name: "signup",
	action(params) {
		mount(FormLayout, {
			content: (<SignUpWrapper token={params.t}/>)
		})
	},
	triggersExit: [subscribeContactSelf]
});

publicRoutes.route('/forgotpassword/:token', {
	action(params) {
		mount(FormLayout, {
			content: (<ForgotPassword token={params.token} />)
		})
	}
});

publicRoutes.route('/forgotpassword', {
	name: "forgotpasswordform",
	action() {
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
		mount(MainLayout, {
			header: "Events",
			content: (<EventCalendarWrapper />)
		})
	}
});

eventsRoutes.route('/attendance/:eid',{
	name: "eventattendance",
	action(params) {
		mount(MainLayout, {
			header: "Attendance",
			content: (<EventDetailWrapper eid={params.eid} />)
		})
	}
});


eventsRoutes.route('/workspace/:eid',{
	name: "workspace",
	action(params) {
		mount(MainLayout, {
			header: "Event Workspace",
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
		// mount(MainLayout, {
		// 	header: params.aord=="accept"?"Accept":"Decline",
		// 	content: (< />)
		// })
		FlowRouter.go("/");
	}
});

eventsRoutes.route("/workspace/:vore/:eid/:uid",{
	action(params) {
		//let ev = Events.findOne(params.eid);
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
			mount(MainLayout, {
				header: "Event Debriefs",
				content: (<EventsDebriefsWrapper />)
			})
		}
	});

	debriefRoutes.route('/view/:eid',{
		name: "viewdebrief",
		action(params) {
			mount(MainLayout, {
				header: "Event Debrief",
				content: (<EventsDebriefWrapper eid={params.eid} />)
			})
		}
	});

	debriefRoutes.route('/edit/:eid',{
		name: "editdebrief",
		action(params) {
			mount(MainLayout, {
				header: "Edit Event Debrief",
				content: (<EventsDebriefWrapper eid={params.eid} edit={true} />)
			})
		}
	});


	debriefRoutes.route('/edit',{
		name: "editdebriefquestions",
		action(){
			mount(MainLayout, {
				header: "Set Debrief Questions",
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
		mount(MainLayout, {
			header: "To-Dos",
			content: (<TicketWrapper />)
		})
	}
});

ticketsRoutes.route('/:tid',{
	action(params) {
		mount(MainLayout, {
			header: "To-Dos",
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
		mount(MainLayout, {
			header: "Churches",
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
		mount(MainLayout, {
			header: "Emails",
			content: (<EmailWrapper />)
		})
	}
});

emailsRoutes.route('/workspace/:emid',{
	name: "emailworkspace",
	action(params){
		mount(MainLayout, {
			header: "Email Workspace",
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

FlowRouter.notFound = {
  action() {
    mount(ErrorLayout, {
				content: (<ErrorPage />)
			}
		)
  }
};
