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
import MemberWrapper from './member/MemberWrapper.jsx';


FlowRouter.route('/',{
	action() {
		mount(MainLayout, {
			content: (<DashboardWrapper />)
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

FlowRouter.route('/events',{
	action() {
		mount(MainLayout, {
			content: (<EventSummary />)
		})
	}
});

FlowRouter.route('/events/workspace',{
	action() {
		mount(MainLayout, {
			content: (<EventWorkspace />)
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

FlowRouter.route('/ethnicity', {
	action() {
		mount(MainLayout, {
				content: (<EthnicityWrapper />)
			}
		)
	}
});
