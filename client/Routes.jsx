import React from 'react';
import {mount} from 'react-mounter';

//Layouts
import {MainLayout} from './layouts/MainLayout.jsx';
import {FormLayout} from './layouts/FormLayout.jsx';
import {ErrorLayout} from './layouts/ErrorLayout.jsx';

//Wrappers
import ErrorPage from './layouts/ErrorPage.jsx';
import DashboardWrapper from './Dashboard.jsx';
import ContactProfileWrapper from './contact/ContactProfileWrapper.jsx';
import UserProfileWrapper from './user/UserProfileWrapper.jsx';
import LoginWrapper from './user/LoginWrapper.jsx';
import SignUpWrapper from './user/SignUpWrapper.jsx';
import SelectContactWrapper from './user/SelectContactWrapper.jsx';
import ForgotPassword from './user/ForgotPassword.jsx';
import NewContactWrapper from './user/NewContactWrapper.jsx';
import ChangePassword from './user/ChangePassword.jsx';
import EthnicityWrapper from './ethnicity/EthnicityWrapper.jsx';
import EventWorkspaceWrapper from './event/EventWorkspaceWrapper.jsx';
import EventsWrapper from './event/EventsWrapper.jsx';
import EventOld from './event/EventOld.jsx';
import EventCalendarWrapper from './event/EventCalendarWrapper.jsx';
import EventCalendarSub from './event/EventCalendarSub.jsx';
import MemberWrapper from './member/MemberWrapper.jsx';
import SigninWrapper from './event/forms/SignInWrapper.jsx';
import RSVPWrapper from './event/forms/RSVP.jsx';
import ChurchesWrapper from './churches/ChurchesWrapper.jsx';
import ChurchesWorkspace from './churches/ChurchesWorkspace.jsx';
import ChurchesOld from './churches/ChurchesOld.jsx';
//import SmallGroupsSummary from './sgroups/SmallGroupsSummary.jsx';
import MySmallGroupWrapper from './sgroups/MySmallGroupWrapper.jsx';
//import SmallGroupsWorkspace from './sgroups/SmallGroupsWorkspace.jsx';
//import SmallGroupsOld from './sgroups/SmallGroupsOld.jsx';
import AttendanceSummary from './attendance/AttendanceWrapper.jsx';
import EventDetailWrapper from './attendance/AttendanceWrapper.jsx';
import TicketWrapper from './tickets/TicketWrapper.jsx';
import EditTicketWrapper from './tickets/EditTicketWrapper.jsx';
import ContactWrapper from './contact/ContactWrapper.jsx';
//import ContactGroupsWrapper from './groups/ContactGroupsWrapper.jsx';
import GroupsWrapper from './groups/GroupsWrapper.jsx';
import AdminDashboard from './admin/AdminDashboard.jsx';
import PagePermissionsWrapper from './admin/pages/PagePermissionsWrapper.jsx';
import SiteSettingsWrapper from './admin/options/SiteSettingsWrapper.jsx';
import UserManagementWrapper from './admin/users/UserManagementWrapper.jsx';
import FeedbackWrapper from './feedback/FeedbackWrapper.jsx';
import DuplicateContactWrapper from './admin/dupcontacts/DuplicateContactWrapper.jsx';
import OverviewWrapper from './admin/overview/OverviewWrapper.jsx';
import EmailWrapper from './email/EmailWrapper.jsx';
import EmailWorkspaceWrapper from './email/EmailWorkspaceWrapper.jsx';



function signInForceCheck(context) {
  // context is the output of `FlowRouter.current()`
	if(context.path.substring(0,6)!="/login"
		&&context.path.substring(0,7)!="/signup"
		&&context.path!="/newcontact"
		&&context.path!="/forgotpassword"
	){
		if(!Meteor.userId()){
			FlowRouter.go("/login?r="+context.path);
		}
	}
}

function subscribeContactSelf(){
	Meteor.subscribe("contact");
}

FlowRouter.triggers.enter([signInForceCheck]);

FlowRouter.route('/',{
	action() {
		mount(MainLayout, {
			header: "Dashboard",
			content: (<DashboardWrapper />)
		})
	}
});

// FlowRouter.route('/groups', {
// 	action() {
// 		mount(MainLayout, {
// 			content: (<ContactGroupsWrapper />)
// 		})
// 	}
// });

FlowRouter.route('/admin', {
	action() {
		mount(MainLayout, {
			header: "Administration",
			content: (<AdminDashboard />)
		})
	}
});

FlowRouter.route('/admin/groups', {
	action() {
		mount(MainLayout, {
			header: "Structures",
			content: (<GroupsWrapper />)
		})
	}
});

FlowRouter.route('/admin/pages', {
	action() {
		mount(MainLayout, {
			header: "Administration",
			content: <PagePermissionsWrapper />
		})
	}
});

FlowRouter.route('/admin/settings', {
	action() {
		mount(MainLayout, {
			header: "Site Settings",
			content: <SiteSettingsWrapper />
		})
	}
});

FlowRouter.route('/admin/users', {
	action() {
		mount(MainLayout, {
			header: "Users",
			content: <UserManagementWrapper />
		})
	}
});

FlowRouter.route('/admin/users/:uid', {
	action(params) {
		mount(MainLayout, {
			header: "Administration",
			content: <UserManagementWrapper uid={params.uid} />
		})
	}
});

FlowRouter.route('/admin/duplicatecontacts', {
	action() {
		mount(MainLayout, {
			header: "Duplicate Contacts",
			content: <DuplicateContactWrapper />
		})
	}
});

FlowRouter.route('/admin/overview', {
	action() {
		mount(MainLayout, {
			header: "Chapter Overview",
			content: <OverviewWrapper />
		})
	}
});

FlowRouter.route('/profile',{
	action() {
		mount(MainLayout, {
			header: "My Account",
			content: (<UserProfileWrapper />)
		})
	}
});

FlowRouter.route('/people/:cid',{
	action(params) {
		mount(MainLayout, {
			header: "People",
			content: (<ContactProfileWrapper cid={params.cid} />)
		})
	}
});

FlowRouter.route('/people', {
	action(){
		mount(MainLayout, {
			header: "People",
			content: (<ContactWrapper />)
		})
	}
});

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

FlowRouter.route('/events', {
	action() {
		mount(MainLayout, {
			header: "Events",
			content: (<EventCalendarWrapper />)
		})
	}
});

// FlowRouter.route('/attendance',{
// 	action() {
// 		mount(MainLayout, {
// 			content: (<AttendanceSummary />)
// 		})
// 	}
// });

FlowRouter.route('/attendance/event/:eid',{
	action(params) {
		mount(MainLayout, {
			header: "Attendance",
			content: (<EventDetailWrapper eid={params.eid} />)
		})
	}
});


FlowRouter.route('/events/workspace/:eid',{
	action(params) {
		mount(MainLayout, {
			header: "Event Workspace",
			content: (<EventWorkspaceWrapper eid={params.eid} />)
		})
	}
});

FlowRouter.route('/events/servicerequests/:aord/:eid/:jid',{
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

// FlowRouter.route('/events/old',{
// 	action() {
// 		mount(MainLayout, {
// 			content: (<EventOld />)
// 		})
// 	}
// });

FlowRouter.route('/tickets',{
	action() {
		mount(MainLayout, {
			header: "Tickets",
			content: (<TicketWrapper />)
		})
	}
});

FlowRouter.route('/tickets/:tid',{
	action(params) {
		mount(MainLayout, {
			header: "Tickets",
			content: (<EditTicketWrapper tid={params.tid} />)
		})
	}
});

FlowRouter.route('/churches',{
	action() {
		mount(MainLayout, {
			header: "Churches",
			content: (<ChurchesWrapper />)
		})
	}
});

FlowRouter.route('/emails',{
	action(){
		mount(MainLayout, {
			header: "Emails",
			content: (<EmailWrapper />)
		})
	}
});

FlowRouter.route('/emails/workspace/:emid',{
	action(params){
		mount(MainLayout, {
			header: "Email Workspace",
			content: (<EmailWorkspaceWrapper emid={params.emid} />)
		})
	}
});

// FlowRouter.route('/churches/workspace/:cid',{
// 	action(params) {
// 		mount(MainLayout, {
// 			content: (<ChurchesWorkspace cid={params.cid} />)
// 		})
// 	}
// });

// FlowRouter.route('/churches/old',{
// 	action() {
// 		mount(MainLayout, {
// 			content: (<ChurchesOld />)
// 		})
// 	}
// });

// FlowRouter.route('/sg',{
// 	action() {
// 		mount(MainLayout, {
// 			content: (<SmallGroupsSummary />)
// 		})
// 	}
// });
//
// FlowRouter.route('/sg/workspace/:gid',{
// 	action(params) {
// 		mount(MainLayout, {
// 			content: (<SmallGroupsWorkspace gid={params.gid} />)
// 		})
// 	}
// });
//
// FlowRouter.route('/sg/old',{
// 	action() {
// 		mount(MainLayout, {
// 			content: (<SmallGRoupsOld />)
// 		})
// 	}
// });


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
	action(params) {
		mount(FormLayout, {
				content: (<SigninWrapper eid={params.eid} />)
			}
		)
	}
});

FlowRouter.route('/forms/rsvp/:eid', {
	action(params) {
		mount(FormLayout, {
				content: (<RSVPWrapper eid={params.eid} />)
			}
		)
	}
});

// FlowRouter.route('/ethnicity', {
// 	action() {
// 		mount(MainLayout, {
// 				content: (<EthnicityWrapper />)
// 			}
// 		)
// 	}
// });

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
