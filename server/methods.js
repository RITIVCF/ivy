Meteor.methods({
  addResolution(resolution){
    Resolutions.insert({
        text: resolution,
        complete: false,
        createdAt: new Date()
    });
  },
  addEthnicity(ethnicity){
    Ethnicities.insert({
      name: ethnicity
    });
  },
  addBlankEvent(){
    return Events.insert({
      name: "New Event",
      createdAt: new Date(),
      published: false,
      edit: [],
      view: []
    });
  }
})
