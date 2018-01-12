import {
  addUserToPrayerGroup,
  removeUserFromPrayerGroup
} from '/lib/groups.js';

Meteor.methods({
  joinPrayerGroup( ) {
    addUserToPrayerGroup({uid: Meteor.userId()});
  },
  addToPrayerGroup(uid) {
    addUserToPrayerGroup({uid: uid});
  },
  leavePrayerGroup({ uid }) {
    removeUserFromPrayerGroup(uid);
  }
});

//
