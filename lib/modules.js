import { Random } from 'meteor/random';
import {

 } from '/lib/emails.js';

export {
	newEmailModule,
	isValidEmailModuleType,
	getEmailModuleType,
	setModuleDesc
};


function newEmailModule( typeId, layout=false ) {
	let type = {};

	if(isValidEmailModuleType(typeId)){
		type = getEmailModuleType(typeId);
	}
	else{
		Meteor.Error("Incorrect type");
	}

  let title = type.name;

	if(!!layout){ // Layout arg is set
		newEmailModuleLayout = layout;
    title = title + ": " + layout;
	}
	else{
		newEmailModuleLayout = type.defaultLayout;
	}



	let module = {
		_id: Random.id(25),
		label: title,
		title: title,
		type: type.value,
		eid: "",
		desc: type.defaultDesc,
		img: "",
		url: "",
		layout: newEmailModuleLayout
	}

	return module;
}

function isValidEmailModuleType(typeId){
	let isValid = Options.findOne({_id: "emailtypes"}).vals.some((val)=>{
		// If matches a valid type, return true for some
		return val.value == typeId;
	});
	return isValid;
}


function getEmailModuleType(typeId){
	let type = null;
	Options.findOne({_id: "emailtypes", "vals.value": typeId}).vals.some((val)=>{
		// If matches a valid type, return true for some
		if(val.value == typeId){
			type = val;
			return true;
		}
	});
	return type;
}

function setModuleDesc(emid, moduleId, desc){
	Emails.update(
		{
			_id: emid,
			"modules._id": moduleId
		},
		{$set: {"modules.$.desc": desc}}
	);
}
