// Check db and initialize
import { Accounts } from 'meteor/accounts-base';
import { newEmailModule } from '/lib/modules.js';

//Set up Groups
let groups = [
	{
		_id:"admin",
		name: "Administrator",
		users: [],
		type: "Permission Group"
	}
];
groups.forEach( (group) => {
	if(!Groups.findOne(group._id)){
		Groups.insert(group);
	}
});





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
	      "color": "#FF0"
	    },
	    {
	      "tag": "Large Group",
	      "color": "#0FF"
	    },
	    {
	      "tag": "Small Group",
	      "color": "#0F0"
	    },
	    {
	      "tag": "NSO",
	      "color": "#F0F"
	    },
	    {
	      "tag": "Prayer",
	      "color": "#00F"
	    },
	    {
	      "tag": "Conference",
	      "color": "#F00"
	    },
	    {
	      "tag": "Core",
	      "color": "#DA7C30"
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
	      "isUserAccessible": false
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
	      "value": "banner",
				"name": "Banner",
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
	          "id": "feedback",
	          "icon": "swap_vert",
	          "text": "Feedback",
	          "permission": "feedback",
	          "children": []
	        },
	        {
	          "id": "overview",
	          "icon": "assessment",
	          "text": "Chapter Overview",
	          "permission": "admin",
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
	      "value": "nso",
				"name": "NSO",
				"defaultLayout": "grid",
				"defaultDesc": "",
	      "canChooseLayout": false
	    },
	    {
	      "value": "social",
				"name": "Social",
				"defaultLayout": "feature",
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
				"defaultDesc": "",
	      "canChooseLayout": false
	    },
	    {
	      "value": "becomeamember",
				"name": "Become a Member",
				"defaultLayout": "text",
				"defaultDesc": "",
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
	}
];

options.forEach( (option) => {
	if(!Options.findOne(option._id)){
		Options.insert(option);
	}
	else{
		Options.remove({_id: option._id});
		Options.insert(option);
	}
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
			newEmailModule("salutation"),
			newEmailModule("nso"),
			newEmailModule("social"),
			newEmailModule("largegroup"),
			newEmailModule("smallgroup"),
			newEmailModule("prayer"),
			newEmailModule("core"),
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
	}
];

emailTemplates.forEach( (template) => {
	Emails.remove({_id: template._id});
	Emails.insert(template);
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
