// Check db and initialize
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { newEmailModule } from '/lib/modules.js';
import { createNewUser } from '/lib/users.js';

// Set admin user
let adminUserId = null;
let adminUser = Meteor.users.findOne({username: "admin"});
if(!adminUser){
	let userDoc = {
		name: "Administrator",
		username: "admin",
		password: Meteor.settings.adminpassword
	}

	adminUserId = createNewUser(userDoc, true);
}


// Set up Groups
let groups = [
	{
		_id:"admin",
		name: "Administrator",
		users: [],
		type: "Permission Group"
	},
	{
		_id: "prayergroup",
		name: "Prayer Group",
		users: [],
		type: "Mailing List"
	},
	{
		_id: "prayergroupleaders",
		name: "Prayer Group Leaders",
		users: [],
		type: "Role"
  },
  {
		_id: "newsletter",
		name: "Newsletter Recipients",
		users: [],
		type: "Mailing List"
	}
];
groups.forEach( (group) => {
	if(!Groups.findOne(group._id)){

		Groups.insert(group);
	}
});


// If admin user needs to be created
if(!!adminUserId){
	let adminGroup = Groups.findOne({
		_id: "admin",
		users: adminUserId
	});
	if(!adminGroup){
		Groups.update("admin", {$addToSet: {users: adminUserId}});
	}
}


//Set up Options
let options = [
	{
	  "_id": "tickettypes",
	  "vals": [
	    "Contact",
	    "Event Request",
	    "Prayer",
	    "Other"
	  ]
	},
	{
	"_id": "communitylife",
	"vals": [
		  "I regularly attend church",
		  "I regularly volunteer"
		]
	},
	{
	  "_id": "ethnicities",
	  "vals": [
	    "Black/African American",
	    "East Asian American",
	    "Hispanic/Latino American",
	    "Middle Eastern American",
	    "Native American/Alaska Native/First Nations",
	    "Native Hawaiian/Pacific Islander American",
	    "South Asian American",
	    "Southeast Asian American",
	    "Biracial/Multireacial American",
	    "White/Caucasian American"
	  ]
	},
	{
	  "_id": "gradterms",
	  "vals": [
	    "Fall 2016",
	    "Spring 2017",
	    "Summer 2017",
	    "Fall 2017",
	    "Spring 2018",
	    "Summer 2018",
	    "Fall 2018",
	    "Spring 2019",
	    "Summer 2019",
	    "Fall 2019",
	    "Spring 2020",
	    "Summer 2020",
	    "Fall 2020",
	    "Spring 2021",
	    "Summer 2021",
	    "Fall 2021",
	    "Spring 2022"
	  ]
	},
	{
	  "_id": "lgweeksahead",
	  "val": 4
	},
	{
	  "_id": "prayerweeksahead",
	  "val": 4
	},
	{
	  "_id": "campusaffiliations",
	  "vals": [
	    "Nursing",
	    "Greek",
	    "Arts",
	    "Athletics"
	  ]
	},
	{
	  "_id": "ticketstatuses",
	  "vals": [
	    "Open",
	    "Pending",
	    "In Progress",
	    "Cancelled",
	    "Closed"
	  ]
	},
	{
		"_id": "times",
		"vals": [
			"7:00am",
			"7:30am",
			"8:00am",
			"8:30am",
			"9:00am",
			"9:30am",
			"10:00am",
			"10:30am",
			"11:00am",
			"11:30am",
			"12:00pm",
			"12:30pm",
			"1:00pm",
			"1:30pm",
			"2:00pm",
			"2:30pm",
			"3:00pm",
			"3:30pm",
			"4:00pm",
			"4:30pm",
			"5:00pm",
			"5:30pm",
			"6:00pm",
			"6:30pm",
			"7:00pm",
			"7:30pm",
			"8:00pm",
			"8:30pm",
			"9:00pm",
			"9:30pm",
			"10:00pm",
			"10:30pm",
			"11:00pm",
			"11:30pm",
			"12:00am"
		]
	},
	{
	  "_id": "howhear",
	  "vals": [
	    "Handouts",
	    "Posters",
	    "Club Center",
	    "Facebook",
	    "IVCF Website",
	    "Message Center",
	    "Word of Mouth",
	    "Personal Invitation"
	  ]
	},
	{
	  "_id": "calendarview",
	  "val": "month"
	},
	{
	  "_id": "ticketcontact",
	  "gid": "evuCHZ9qZJyG23SJL"
	},
	{
	  "_id": "ticketeventrequest",
	  "gid": "PE7nze5figZEhgCWh"
	},
	{
	  "_id": "eventtags",
	  "vals": [
	    {
	      "tag": "Social",
	      "color": "#FF5722"
	    },
	    {
	      "tag": "Large Group",
	      "color": "#3F51B5"
	    },
	    {
	      "tag": "Small Group",
	      "color": "#009688"
	    },
	    {
	      "tag": "NSO",
	      "color": "#FFC107"
	    },
	    {
	      "tag": "Prayer",
	      "color": "#9C27B0"
	    },
	    {
	      "tag": "Conference",
	      "color": "#8BC34A"
	    },
	    {
	      "tag": "Core",
	      "color": "#2196F3"
	    }
	  ]
	},
	{
	  "_id": "requesttypes",
	  "vals": [
	    {
	      "label": "Resource",
	      "gid": "admin"
	    },
	    {
	      "label": "Design",
	      "gid": "admin"
	    },
	    {
	      "label": "Advertising",
	      "gid": "admin"
	    },
	    {
	      "label": "Other",
	      "gid": "admin"
	    }
	  ]
	},
	{
		_id: "debriefquestions",
		val: ""
	},
	{
	  "_id": "funnelcalculation",
	  "threshold": 2,
	  "period": 4,
	  "interval": 7
	},
	{
	  "_id": "emaillayouts",
	  "vals": [
	    {
	      "value": "header",
				"name": "Header",
	      "isUserAccessible": false
	    },
	    {
	      "value": "footer",
				"name": "Footer",
	      "isUserAccessible": false
	    },
	    {
	      "value": "socialmedia",
				"name": "Social Media",
	      "isUserAccessible": false
	    },
	    {
	      "value": "text",
				"name": "Text",
	      "isUserAccessible": true
	    },
	    {
	      "value": "cta",
				"name": "Call to Action",
	      "isUserAccessible": true
	    },
	    {
	      "value": "grid",
				"name": "Grid",
	      "isUserAccessible": false
	    },
	    {
	      "value": "thumbnail",
				"name": "Left/Right Thumbail",
	      "isUserAccessible": true
	    },
	    {
	      "value": "feature",
				"name": "Feature",
	      "isUserAccessible": true
	    },
	    {
	      "value": "spacer",
				"name": "Spacer",
	      "isUserAccessible": true
	    },
	    {
	      "value": "divider",
				"name": "Divider",
	      "isUserAccessible": true
	    }
	  ]
	},
	{
	  "_id": "navitems",
		"items": [
	    {
	      "id": "dashboard",
	      "name": "/",
	      "icon": "dashboard",
	      "text": "My Dashboard",
	      "permission": false,
	      "children": []
	    },
	    {
	      "id": "events",
	      "name": "events",
	      "icon": "today",
	      "text": "Events",
	      "permission": false,
	      "children": []
	    },
	    {
	      "id": "tickets",
	      "name": "tickets",
	      "icon": "receipt",
	      "text": "To-Dos",
	      "permission": "tickets",
	      "children": []
	    },
	    {
	      "id": "emails",
	      "name": "emails",
	      "icon": "email",
	      "text": "Emails",
	      "permission": "emails",
	      "children": []
	    },
	    {
	      "id": "people",
	      "name": "people",
	      "icon": "supervisor_account",
	      "text": "People",
	      "permission": "contacts",
	      "children": []
	    },
	    {
	      "id": "churches",
	      "name": "churches",
	      "icon": "store",
	      "text": "Churches",
	      "permission": "churches",
	      "children": []
	    },
	    {
	      "id": "prayerportal",
	      "name": "prayerportal",
	      "icon": "wifi",
	      "text": "Prayer Portal",
	      "permission": "prayerportal",
	      "children": []
	    },
	    {
	      "id": "admin",
	      "name": "admin",
	      "icon": "perm_data_settings",
	      "text": "Administration",
	      "permission": "admin",
	      "children": [
	        {
	          "id": "structures",
	          "name": "structures",
	          "icon": "recent_actors",
	          "text": "Structures",
	          "permission": "admin",
	          "children": []
	        },
	        {
	          "id": "settings",
	          "icon": "settings",
	          "text": "Site Settings",
	          "permission": "admin",
	          "children": []
	        },
	        {
	          "id": "duplicatecontacts",
	          "icon": "call_merge",
	          "text": "Duplicate Contacts",
	          "permission": "admin",
	          "children": []
	        },
	        {
	          "id": "overview",
	          "icon": "assessment",
	          "text": "Chapter Overview",
	          "permission": "admin",
	          "children": []
	        },
					{
			      "id": "jobmanager",
			      "icon": "dashboard",
			      "text": "Job Manager",
			      "permission": "sysadmin",
			      "children": []
			    }
	      ]
	    }
	  ]
	},
	{
	  "_id": "emailtypes",
	  "vals": [
	    {
	      "value": "intro",
				"name": "Intro",
				"defaultLayout": "text",
				"defaultDesc": "",
	      "canChooseLayout": false
	    },
			{
	      "value": "misvision",
				"name": "Mission\\Vision",
				"defaultLayout": "text",
				"defaultDesc": "In response to God's love, grace, and truth, we want to see LIVES TRANSFORMED, CAMPUSES RENEWED, AND WORLD CHANGERS DEVELOPED",
	      "canChooseLayout": false
	    },
	    {
	      "value": "header",
				"name": "Header",
				"defaultLayout": "header",
				"defaultDesc": "",
	      "canChooseLayout": false
	    },
			{
	      "value": "salutation",
				"name": "Salutation",
				"defaultLayout": "text",
				"defaultDesc": "Hello",
	      "canChooseLayout": false
	    },
	    {
	      "value": "largegroup",
				"name": "Large Group",
				"defaultLayout": "thumbnail",
				"defaultDesc": "",
	      "canChooseLayout": false
	    },
	    {
	      "value": "smallgroup",
				"name": "Small Group",
				"defaultLayout": "grid",
				"defaultDesc": "",
	      "canChooseLayout": false
	    },
	    {
	      "value": "community",
				"name": "Community",
				"defaultLayout": "grid",
				"defaultDesc": "",
	      "canChooseLayout": false
	    },
	    {
	      "value": "prayer",
				"name": "Prayer",
				"defaultLayout": "thumbnail",
				"defaultDesc": "",
	      "canChooseLayout": false
	    },
	    {
	      "value": "getinvolved",
				"name": "Get Involved",
				"defaultLayout": "text",
				"defaultDesc": `What are some ways you can contribute to and make our community better? Every tiny bit is so important and pulls us closer together, closer to God, and brings others closer to Him. Here are some areas you can get involved in. Please email me at ritivcf@gmail.com if you are interested.
				<ul>
					<li>Prayer Meetings – plan, help out, and/or lead</li>
					<li>Advertising/Design Team – brainstorm, design, and/or distribute (currently need people to join)</li>
					<li>Dimitri House homeless shelter volunteering (need people to volunteer one or two times)</li>
					<li>Be an MC at Large Group</li>
					<li>Small Groups – join one and/or lead one</li>
					<li>Large Group – attend and/or help plan</li>
					<li>Resource Team – make sure our club functions :)</li>
					<li>Strategy Team – plan and/or lead events</li>
					<li>Welcome – say ‘hi’ to people as they sign in to Large Group!
					Sound Team</li>
					<li>Worship Team</li>
					<li>Web Development Team</li>
					<li>Fundraising</li>
					<li>After Events planning</li>
					<li>Proxe Stations</li>
					<li>Community Service</li>
				</ul>`,
	      "canChooseLayout": false
	    },
	    {
	      "value": "becomeamember",
				"name": "Become a Member",
				"defaultLayout": "text",
				"defaultDesc": `Do you consider yourself a member of InterVarsity? If so, become a member through a simple process by clicking the button below for instructions. This is a new way to help us keep track of our members as our community grows, so we highly encourage you to do this if you consider yourself a member!`,
	      "canChooseLayout": false
	    },
	    {
	      "value": "conference",
				"name": "Conference",
				"defaultLayout": "feature",
				"defaultDesc": "",
	      "canChooseLayout": false
	    },
	    {
	      "value": "core",
				"name": "Core",
				"defaultLayout": "thumbnail",
				"defaultDesc": "",
	      "canChooseLayout": false
	    },
	    {
	      "value": "custom",
				"name": "Custom",
				"defaultLayout": "text",
				"defaultDesc": "",
	      "canChooseLayout": true
	    }
	  ]
	},
	{
		_id: "emailqueuestatus",
		open: true
	},
	{
		_id: "emailsendoverride",
		val: false
	},
	{
		_id: "defaulteventgroups",
		gids: []
  },
  {
		_id: "duplicateeventfields",
		vals: [
			"name",
			"description",
			"start",
			"end",
			"location",
			"tags",
			"permUser",
			"permGroup",
			"evr",
			"pic",
			"status",
			"notes",
			"attachements",
			"reserved",
			"groupId"
		]
	}
	// group perm template: {id:groupId, edit: false}
];

options.forEach( (option) => {
	const currOptions = Options.findOne(option._id);
	if(!currOptions){
		Options.insert(option);
	} else {
		if(option._id == "emailtypes"){
			// do not overwrite existing modules
			// Add new modules
			// Remove modules not in db init


			let moduleValues = [];

			option.vals.forEach( (module) =>{
				if(!Options.findOne({_id: option._id, "vals.value": module.value})){
					Options.update(option._id, {$addToSet: {modules: module}});
				}

				moduleValues.push(module.value);
			});

			// Remove any modules that are not in the dbinit
			Options.update(option._id, {$pull: {vals: {value: {$nin: moduleValues}}}});



		}
	}
	// else{
	// 	Options.remove({_id: option._id});
	// 	Options.insert(option);
	// }
});



// Intialize Email Templates
let emailTemplates = [
	{
	  "_id": "newsletter",
	  "to": {
	    "users": [],
	    "groups": [],
	    "emails": []
	  },
	  "from": "ivcf@rit.edu",
	  "subject": "IVCF Chapter Newsletter",
	  "isTemplate": true,
	  "title": "Newsletter",
	  "modules": [
			newEmailModule("intro"),
			newEmailModule("misvision"),
			newEmailModule("community"),
			newEmailModule("largegroup"),
			newEmailModule("smallgroup"),
			newEmailModule("prayer"),
			newEmailModule("conference"),
			newEmailModule("becomeamember"),
			newEmailModule("getinvolved")
		]
	},
	{
	  "_id": "eventfollowup",
	  "to": {
	    "users": [],
	    "groups": [],
	    "emails": []
	  },
	  "from": "",
	  "subject": "Welcome to InterVarsity!",
	  "isTemplate": true,
	  "title": "Event Follow Up",
	  "modules": [
			newEmailModule("salutation"),
			newEmailModule("misvision"),
			newEmailModule("custom")
		]
	},
	{
	  "_id": "todoemail",
	  "to": {
	    "users": [],
	    "groups": [],
	    "emails": []
	  },
	  "from": "",
	  "subject": "Email Subject",
	  "isTemplate": true,
	  "title": "ToDo Email",
	  "modules": [
			newEmailModule("custom")
		]
	},
	{
		"_id": "prayergroup",
	  "to": {
	    "users": [],
	    "groups": [],
	    "emails": []
	  },
	  "from": "",
	  "subject": "Prayer Group Update Email Subject",
	  "isTemplate": true,
	  "title": "Prayer Group Update",
	  "modules": [
			newEmailModule("custom"),
			newEmailModule("prayer")
		]
	}
];

emailTemplates.forEach( (template) => {
	let currentRecord = Emails.findOne(template._id);
	if(!currentRecord){
		Emails.insert(template);
	}
});

// initialize counters
let counters = [
	{
		_id: "ticketID",
		seq: 1
	}
];

counters.forEach( (counter) => {
	if(!Counters.findOne(counter._id)){
		Counters.insert(counter);
	}
});


// Initialize page permissions
let pagePermissions = [
	{
	  "_id": "removecontact",
	  "groups": [
	    "admin"
	  ],
	  "pagename": "Remove Contacts"
	},
	{
	  "_id": "feedback",
	  "groups": [
	    "admin"
	  ],
	  "pagename": "View Feedback"
	},
	{
	  "_id": "contactdetails",
	  "groups": [
	    "admin"
	  ],
	  "pagename": "Edit Contact/Member Details"
	},
	{
	  "_id": "contacts",
	  "groups": [
	    "admin"
	  ],
	  "pagename": "View Contacts Dashboard"
	},
	{
	  "_id": "attendance",
	  "groups": [
	    "admin"
	  ],
	  "pagename": "View Attendance"
	},
	{
	  "_id": "events",
	  "groups": [
	    "admin"
	  ],
	  "pagename": "Access Event Management"
	},
	{
	  "_id": "tickets",
	  "groups": [
	    "admin"
	  ],
	  "pagename": "View/Edit Tickets"
	},
	{
	  "_id": "memberdetail",
	  "groups": [
	    "admin"
	  ],
	  "pagename": "View Membership Details"
	},
	{
	  "_id": "churches",
	  "groups": [
	    "admin"
	  ],
	  "pagename": "View/Edit Churches"
	},
	{
	  "_id": "admin",
	  "groups": [
	    "admin"
	  ],
	  "pagename": "Administration"
	},
	{
	  "_id": "emails",
	  "groups": [
	    "admin"
	  ],
	  "pagename": "View/Edit Emails"
	},
	{
	  "_id": "ivrep",
	  "groups": [
	    "admin"
	  ],
	  "pagename": "IV Official"
	},
	{
	  "_id": "forms",
	  "groups": [
	    "admin"
	  ],
	  "pagename": "View/Edit Forms"
	},
	{
	  "_id": "sysadmin",
	  "groups": [
	    "admin"
	  ],
	  "pagename": "System Administrator"
	},
	{
		"_id": "prayerportal",
		"groups": [
			"prayergroupleaders"
		],
		"pagename": "Manage Prayer Group"
	}
];

pagePermissions.forEach( (perm) => {
	if(!PagePermissions.findOne(perm._id)){
		PagePermissions.insert(perm);
	}
});



// Initialize admin user
// Other parts need thought out before this is implemented
// if(!Meteor.users.findOne({username: "admin"})){
// 	Accounts.createUser({
// 		name: "Administrator",
// 		username: "admin",
// 		createdAt: new Date(),
// 		deleted: true
// 	});
// }
