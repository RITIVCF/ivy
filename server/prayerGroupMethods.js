import { addUserToPrayerGroup } from '/lib/groups.js';

Meteor.methods({
  joinPrayerGroup( ) {
    addUserToPrayerGroup({uid: Meteor.userId()});
  }
});
