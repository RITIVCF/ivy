import {
  addUserToPrayerGroup,
  removeUserFromPrayerGroup
} from '/lib/groups.js';

Meteor.methods({
  joinPrayerGroup( ) {
    addUserToPrayerGroup({uid: Meteor.userId()});
  },
  addToPrayerGroup({user}) {
    addUserToPrayerGroup({uid: user._id});
  },
  leavePrayerGroup({ uid }) {
    removeUserFromPrayerGroup(uid);
  }
});
