import React from 'react';
import {mount} from 'react-mounter';

//Layouts
import {MainLayout} from './layouts/MainLayout.jsx';
import {FormLayout} from './layouts/FormLayout.jsx';
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
// ****************************

// ****  Events   *********
import EventWorkspaceWrapper from './event/EventWorkspaceWrapper.jsx';
import EventsWrapper from './event/EventsWrapper.jsx';
import EventOld from './event/EventOld.jsx';
import EventCalendarWrapper from './event/EventCalendarWrapper.jsx';
import EventCalendarSub from './event/EventCalendarSub.jsx';
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
import NewContactWrapper from './user/NewContactWrapper.jsx';
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
import EmailTemplateViewWrapper from '/client/email/templateview/EmailTemplateViewWrapper.jsx';
// ****************************


function signInForceCheck(context) {
  // context is the output of `FlowRouter.current()`
	if(context.path.substring(0,6)!="/login"
		&&context.path.substring(0,7)!="/signup"
		&&context.path!="/newcontact"
		&&context.path.substring(0,15)!="/forgotpassword"
	){
		if(!Meteor.userId()){
			FlowRouter.go("/login?r="+context.path);
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

dashboardRoute.route('/profile',{
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

peopleRoutes.route('/:cid',{
	action(params) {
		mount(MainLayout, {
			header: "People",
			content: (<ContactProfileWrapper cid={params.cid} />)
		})
	}
});

//********** ./ People Routes ***********



FlowRouter.route('/forms/contacts/new', {
	action(){
		mount(FormLayout, {
			content: (<NewContactWrapper />)
		})
	}
});

FlowRouter.route('/newcontact', {
	action(){
		mount(FormLayout, {
			content: (<NewContactWrapper route={"/signup"} />)
		})
	}
});

FlowRouter.route('/mysg', {
	action() {
		mount(MainLayout, {
			header: "My Small Group",
			content: (<MySmallGroupWrapper />)
		})
	}
});

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
				console.log("Event: ", ev);
				if(Meteor.userId()==ev.owner){
					Meteor.call("addEventUserPerm",params.eid,params.uid);
					console.log("Added perm");
					if(params.vore=="edit"){
						console.log("Add edit perm");
						Meteor.call("updateEventUserPerm", params.eid, params.uid, true );
					}
					console.log("Perms added, go to dahsboard");
					FlowRouter.go("/");
				}else{
					FlowRouter.go("/event/workspace/"+params.vore+"/"+params.eid+"/"+params.uid);
				}
			}
		});

	}
});

eventsRoutes.route('/debrief',{
	action(params) {
		mount(MainLayout, {
			header: "Event Debriefs",
			content: (<EventsDebriefsWrapper />)
		})
	}
});


eventsRoutes.route('/debrief/:eid',{
	action(params) {
		mount(MainLayout, {
			header: "Event Debrief",
			content: (<EventsDebriefWrapper eid={params.eid} />)
		})
	}
});


eventsRoutes.route('/debrief/edit/:eid', {
	action(params) {
		mount(MainLayout, {
			header: "Edit Event Debrief",
			content: (<EventsDebriefWrapper eid={params.eid} edit={true} />)
		})
	}
});

eventsRoutes.route('/debrief/edit',{
	action(){
		mount(MainLayout, {
			header: "Set Debrief Questions",
			content: (<DebriefCreationWrapper />)
		})
	}
});

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
			header: "Tickets",
			content: (<TicketWrapper />)
		})
	}
});

ticketsRoutes.route('/:tid',{
	action(params) {
		mount(MainLayout, {
			header: "Tickets",
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

// Email template view for iframe
emailsRoutes.route('/editorView/:emid',{
	name: "emailtemplateView",
	action(params){
		mount(EmailTemplateViewLayout, {
			content: (<EmailTemplateViewWrapper emid={params.emid} />)
		})
	}
});

// *******  ./ Emails Routes  **********


FlowRouter.route('/forms/member', {
	action() {
		mount(FormLayout, {
				content: (<MemberWrapper />)
			}
		)
	}
});

FlowRouter.route('/forms/contact', {
	action() {
		mount(FormLayout, {
				content: (<ContactWrapper />)
			}
		)
	}
});

FlowRouter.route('/forms/signin/:eid', {
	name: "signinform",
	action(params) {
		mount(FormLayout, {
				content: (<SigninWrapper eid={params.eid} />)
			}
		)
	}
});

FlowRouter.route('/forms/rsvp/:eid', {
	name: "rsvpform",
	action(params) {
		mount(FormLayout, {
				content: (<RSVPWrapper eid={params.eid} />)
			}
		)
	}
});

FlowRouter.route('/login', {
	action(params, queryParams) {
		mount(FormLayout,  {
			content: (<LoginWrapper route={queryParams.r} />)
		})
	},
	triggersExit: [subscribeContactSelf]
});

FlowRouter.route('/signup', {
	action() {
		mount(FormLayout, {
			content: (<SelectContactWrapper />)
		})
	}
});

FlowRouter.route('/signup/:t', {
	action(params) {
		mount(FormLayout, {
			content: (<SignUpWrapper token={params.t}/>)
		})
	},
	triggersExit: [subscribeContactSelf]
});

FlowRouter.route('/changepassword', {
	action() {
		mount(MainLayout, {
			header: "My Account",
			content: (<ChangePassword />)
		})
	}
});

FlowRouter.route('/forgotpassword/:token', {
	action(params) {
		mount(FormLayout, {
			content: (<ForgotPassword token={params.token} />)
		})
	}
});

FlowRouter.route('/forgotpassword', {
	action() {
		mount(FormLayout, {
			content: (<ForgotPassword />)
		})
	}
});

FlowRouter.route('/feedback',{
	action() {
		mount(MainLayout, {
			header: "Feedback Summary",
			content: (<FeedbackWrapper />)
		})
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
