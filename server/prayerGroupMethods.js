import {
  addUserToPrayerGroup,
  removeUserFromPrayerGroup
} from '/lib/groups.js';

Meteor.methods({
  joinPrayerGroup( ) {
    addUserToPrayerGroup({uid: Meteor.userId()});
  },
  leavePrayerGroup({ uid }) {
    console.log(uid);
    removeUserFromPrayerGroup(uid);
  }
});
