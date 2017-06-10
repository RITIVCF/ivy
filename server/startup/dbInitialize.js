// Intialiaze DB


// Options
let emailtypes = [
	{
      value: "intro",
      canChooseLayout: false
    },
    {
      value: "header",
      canChooseLayout: false
    },
    {
      value: "largegroup",
      canChooseLayout: false
    },
    {
      value: "smallgroup",
      canChooseLayout: false
    },
    {
      value: "nso",
      canChooseLayout: false
    },
    {
      value: "social",
      canChooseLayout: false
    },
    {
      value: "prayer",
      canChooseLayout: false
    },
    {
      value: "getinvolved",
      canChooseLayout: false
    },
    {
      value: "becomeamember",
      canChooseLayout: false
    },
    {
      value: "conference",
      canChooseLayout: false
    },
    {
      value: "core",
      canChooseLayout: false
    },
    {
      value: "custom",
      canChooseLayout: true
    },
    {
      value: "eventpromotion",
      canChooseLayout: false
    }
];
if(!Options.findOne("emailtypes")){
	Options.insert({_id: "emailtypes", vals: emailtypes});
}
else{
	Options.update({_id: "emailtypes"}, {$set: {vals: emailtypes}});
}


let emaillayouts = [
	{
		value: "header",
		isUserAccessible: false
	},
	{
		value: "footer",
		isUserAccessible: false
	},
	{
		value: "socialmedia",
		isUserAccessible: false
	},
	{
		value: "text",
		isUserAccessible: true
	},
	{
		value: "cta",
		isUserAccessible: false
	},
	{
		value: "grid",
		isUserAccessible: false
	},
	{
		value: "thumbnail",
		isUserAccessible: false
	},
	{
		value: "feature",
		isUserAccessible: true
	},
	{
		value: "banner",
		isUserAccessible: false
	}
];
if(!Options.findOne("emaillayouts")){
	Options.insert({_id: "emaillayouts", vals: emaillayouts});
}
else{
	Options.update({_id: "emaillayouts"}, {$set: {vals: emaillayouts}});
}



[

  ]
