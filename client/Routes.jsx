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
import NewContactWrapper from './contact/NewContactWrapper.jsx';
import ChangePassword from './user/ChangePassword.jsx';
import EthnicityWrapper from './ethnicity/EthnicityWrapper.jsx';
import EventWorkspace from './event/EventWorkspace.jsx';
import EventsWrapper from './event/EventsWrapper.jsx';
import EventOld from './event/EventOld.jsx';
import EventCalendarWrapper from './event/EventCalendarWrapper.jsx';
import EventCalendarSub from './event/EventCalendarSub.jsx';
import MemberWrapper from './member/MemberWrapper.jsx';
import SigninWrapper from './event/forms/SignInWrapper.jsx';
import RSVPWrapper from './event/forms/RSVP.jsx';
import ChurchesSummary from './churches/ChurchesSummary.jsx';
import ChurchesWorkspace from './churches/ChurchesWorkspace.jsx';
import ChurchesOld from './churches/ChurchesOld.jsx';
import SmallGroupsSummary from './sgroups/SmallGroupsSummary.jsx';
import SmallGroupsWorkspace from './sgroups/SmallGroupsWorkspace.jsx';
import SmallGroupsOld from './sgroups/SmallGroupsOld.jsx';
import AttendanceSummary from './attendance/AttendanceSummary.jsx';
import EventDetailWrapper from './attendance/EventDetailWrapper.jsx';
import TicketSummary from './tickets/TicketSummary.jsx';
import EditTicketWrapper from './tickets/EditTicketWrapper.jsx';
import ContactSummary from './contact/ContactSummary.jsx';
import ContactGroupsWrapper from './groups/ContactGroupsWrapper.jsx';
import AdminGroupsWrapper from './groups/AdminGroupsWrapper.jsx';
import AdminDashboard from './admin/AdminDashboard.jsx';
import PagePermissionsWrapper from './admin/pages/PagePermissionsWrapper.jsx';
import SiteSettingsWrapper from './admin/options/SiteSettingsWrapper.jsx';
import UserManagementWrapper from './admin/users/UserManagementWrapper.jsx';
import FeedbackWrapper from './feedback/FeedbackWrapper.jsx';
import DuplicateContactWrapper from './admin/dupcontacts/DuplicateContactWrapper.jsx';



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
			content: (<AdminDashboard />)
		})
	}
});

FlowRouter.route('/admin/groups', {
	action() {
		mount(MainLayout, {
			content: (<AdminGroupsWrapper />)
		})
	}
});

FlowRouter.route('/admin/pages', {
	action() {
		mount(MainLayout, {
			content: <PagePermissionsWrapper />
		})
	}
});

FlowRouter.route('/admin/settings', {
	action() {
		mount(MainLayout, {
			content: <SiteSettingsWrapper />
		})
	}
});

FlowRouter.route('/admin/users', {
	action() {
		mount(MainLayout, {
			content: <UserManagementWrapper />
		})
	}
});

FlowRouter.route('/admin/duplicatecontacts', {
	action() {
		mount(MainLayout, {
			content: <DuplicateContactWrapper />
		})
	}
});

FlowRouter.route('/profile',{
	action() {
		mount(MainLayout, {
			content: (<UserProfileWrapper />)
		})
	}
});

FlowRouter.route('/contacts/:cid',{
	action(params) {
		mount(MainLayout, {
			content: (<ContactProfileWrapper cid={params.cid} />)
		})
	}
});

FlowRouter.route('/contacts', {
	action(){
		mount(MainLayout, {
			content: (<ContactSummary />)
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

FlowRouter.route('/calendar', {
	action() {
		mount(MainLayout, {
			content: (<EventCalendarSub />)
		})
	}
});

FlowRouter.route('/attendance',{
	action() {
		mount(MainLayout, {
			content: (<AttendanceSummary />)
		})
	}
});

FlowRouter.route('/attendance/event/:eid',{
	action(params) {
		mount(MainLayout, {
			content: (<EventDetailWrapper eid={params.eid} />)
		})
	}
});

FlowRouter.route('/events',{
	action() {
		mount(MainLayout, {
			content: (<EventsWrapper />)
		})
	}
});

FlowRouter.route('/events/workspace/:eid',{
	action(params) {
		mount(MainLayout, {
			content: (<EventWorkspace eid={params.eid} />)
		})
	}
});

FlowRouter.route('/events/old',{
	action() {
		mount(MainLayout, {
			content: (<EventOld />)
		})
	}
});

FlowRouter.route('/tickets',{
	action() {
		mount(MainLayout, {
			content: (<TicketSummary />)
		})
	}
});

FlowRouter.route('/tickets/:tid',{
	action(params) {
		mount(MainLayout, {
			content: (<EditTicketWrapper tid={params.tid} />)
		})
	}
});

FlowRouter.route('/churches',{
	action() {
		mount(MainLayout, {
			content: (<ChurchesSummary />)
		})
	}
});

FlowRouter.route('/churches/workspace/:cid',{
	action(params) {
		mount(MainLayout, {
			content: (<ChurchesWorkspace cid={params.cid} />)
		})
	}
});

FlowRouter.route('/churches/old',{
	action() {
		mount(MainLayout, {
			content: (<ChurchesOld />)
		})
	}
});

FlowRouter.route('/sg',{
	action() {
		mount(MainLayout, {
			content: (<SmallGroupsSummary />)
		})
	}
});

FlowRouter.route('/sg/workspace/:gid',{
	action(params) {
		mount(MainLayout, {
			content: (<SmallGroupsWorkspace gid={params.gid} />)
		})
	}
});

FlowRouter.route('/sg/old',{
	action() {
		mount(MainLayout, {
			content: (<SmallGRoupsOld />)
		})
	}
});


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

FlowRouter.route('/ethnicity', {
	action() {
		mount(MainLayout, {
				content: (<EthnicityWrapper />)
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
