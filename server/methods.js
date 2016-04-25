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
  }
})
