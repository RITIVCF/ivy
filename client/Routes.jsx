import React from 'react';
import {mount} from 'react-mounter';

//Layouts
import {MainLayout} from './layouts/MainLayout.jsx';
import {FormLayout} from './layouts/FormLayout.jsx';
import {PublicLayout} from './layouts/PublicLayout.jsx';

//Wrappers
import ResolutionsWrapper from './resolutions/ResolutionsWrapper.jsx';
import AboutWrapper from './public/AboutWrapper.jsx';
import MemberWrapper from './member/MemberWrapper.jsx';
import EthnicityWrapper from './member/EthnicityWrapper.jsx';
import ContactWrapper from './contact/ContactWrapper.jsx';
import IndexWrapper from './public/Index.jsx';
import SmallGroupWrapper from './public/smallgroup/SmallGroupWrapper.jsx';
import OurChapterWrapper from './public/OurChapterWrapper.jsx';
import LargeGroupWrapper from './public/largegroup/LargeGroupWrapper.jsx';
import PrayerWrapper from './public/prayer/PrayerWrapper.jsx';
import LocalChurchesWrapper from './public/localchurches/LocalChurchesWrapper.jsx';


FlowRouter.route('/',{
	action() {
		mount(PublicLayout, {
			content: (<IndexWrapper />)
		})
	}
});

FlowRouter.route('/ivy',{
	action() {
		mount(MainLayout, {
			content: (<ResolutionsWrapper />)
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

FlowRouter.route('/about', {
	action() {
		mount(PublicLayout, {
				content: (<AboutWrapper />)
			}
		)
	}
});

FlowRouter.route('/ourchapter',{
	action() {
		mount(PublicLayout, {
			content: (<OurChapterWrapper />)
		})
	}
});

FlowRouter.route('/smallgroup', {
	action() {
		mount(PublicLayout, {
				content: (<SmallGroupWrapper />)
			}
		)
	}
});

FlowRouter.route('/prayer', {
	action() {
		mount(PublicLayout, {
				content: (<PrayerWrapper />)
			}
		)
	}
});

FlowRouter.route('/largegroup', {
	action() {
		mount(PublicLayout, {
				content: (<LargeGroupWrapper />)
			}
		)
	}
});

FlowRouter.route('/localchurches', {
	action() {
		mount(PublicLayout, {
				content: (<LocalChurchesWrapper />)
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

FlowRouter.route('/forms/ethnicity', {
	action() {
		mount(FormLayout, {
				content: (<EthnicityWrapper />)
			}
		)
	}
});
