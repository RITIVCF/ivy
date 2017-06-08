Meteor.methods({
  insertNewNavItem(id, icon, text, permission=false, parentID=false){
		if(!(!!id&&!!icon&&!!text)){
			Meteor.Error("invalid", "Invalid arguments", "You did not provide the correct arguments.");
		}

		let item = {
			id: id,
			icon: icon,
			text: text,
			permission: permission,
			children: []
		}

		if(!parentID){
			Options.update({_id:"navitems"},{$addToSet: {items: item}});
		}
		else{
			let child = item;
			Options.update({_id:"navitems", "items.id": parentID},{$addToSet: {"items.$.children": child}});
		}
	}
});
