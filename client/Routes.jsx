import React from 'react';
import {mount} from 'react-mounter';

//Layouts
import {MainLayout} from './layouts/MainLayout.jsx';
import {FormLayout} from './layouts/FormLayout.jsx';

//Wrappers
import DashboardWrapper from './Dashboard.jsx';
import UserProfileWrapper from './user/UserProfileWrapper.jsx';
import ResolutionsWrapper from './resolutions/ResolutionsWrapper.jsx';
import EthnicityWrapper from './ethnicity/EthnicityWrapper.jsx';
import EventWorkspace from './event/EventWorkspace.jsx';
import EventSummary from './event/EventSummary.jsx';
import EventOld from './event/EventOld.jsx';
import EventCalendarWrapper from './event/EventCalendarWrapper.jsx';
import MemberWrapper from './member/MemberWrapper.jsx';
import SigninWrapper from './event/forms/SignIn.jsx';
import RSVPWrapper from './event/forms/RSVP.jsx';
import ChurchesSummary from './churches/ChurchesSummary.jsx';
import ChurchesWorkspace from './churches/ChurchesWorkspace.jsx';
import ChurchesOld from './churches/ChurchesOld.jsx';
import SmallGroupsSummary from './sgroups/SmallGroupsSummary.jsx';
import SmallGroupsWorkspace from './sgroups/SmallGroupsWorkspace.jsx';
import SmallGroupsOld from './sgroups/SmallGroupsOld.jsx';
import AttendanceSummary from './attendance/AttendanceSummary.jsx';
import EventDetail from './attendance/EventDetail.jsx';


FlowRouter.route('/',{
	action() {
		mount(MainLayout, {
			content: (<DashboardWrapper />)
		})
	}
});

let fireReload = false;

function reloadCheck(context, redirect, stop) {
  if (fireReload) {
    console.log('Hugh is Awesome and also reloading screen...');
    FlowRouter.reload();
    stop();
  }
}

function routeCleanup() {
  fireReload = !fireReload;
}

FlowRouter.route('/profile',{
	action() {
		mount(MainLayout, {
			content: (<UserProfileWrapper />)
		})
	},
	triggersEnter: [reloadCheck],
  triggersExit: [routeCleanup]
});

FlowRouter.route('/profile/:uid',{
	action(params) {
		mount(MainLayout, {
			content: (<UserProfileWrapper uid={params.uid} />)
		})
	},
	triggersEnter: [reloadCheck],
  triggersExit: [routeCleanup]
});

FlowRouter.route('/calendar', {
	action() {
		mount(MainLayout, {
			content: (<EventCalendarWrapper />)
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
			content: (<EventDetail eid={params.eid} />)
		})
	}
});

FlowRouter.route('/events',{
	action() {
		mount(MainLayout, {
			content: (<EventSummary />)
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

FlowRouter.route('/churches',{
	action() {
		mount(MainLayout, {
			content: (<ChurchesSummary />)
		})
	}
});

FlowRouter.route('/Churches/workspace/:cid',{
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

FlowRouter.route('/resolutions', {
	action() {
		mount(MainLayout, {
				content: (<ResolutionsWrapper />)
			}
		)
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
