// Imports
import {
  submitPrayerRequest,
  submitPrayerRequestUpdate,
  publishPrayerRequest,
  reportPrayerRequest,
  acceptPrayerRequestReport,
  rejectPrayerRequestReport,
  prayForRequest
} from '/server/prayerwall';

Meteor.methods({
  submitPrayerRequest({name=null, email, content, audience="Leaders"}){
    if (audience == "") {
      audience == "Leaders";
    }

    return submitPrayerRequest({ name, email, content, audience });
  },
  submitPrayerRequestUpdate({ prayerRequestID, content, type }){
    return submitPrayerRequestUpdate({ prayerRequestID, content, type });
  },
  publishPrayerRequest({ requestID }){
    return publishPrayerRequest({ requestID });
  },
  prayForRequest({ requestID }){
    return prayForRequest({ requestID });
  },
  reportPrayerRequest({ requestID }){
    return reportPrayerRequest({ requestID });
  },
  acceptPrayerRequestReport({ requestID }){
    return acceptPrayerRequestReport({ requestID });
  },
  rejectPrayerRequestReport({ requestID }){
    return rejectPrayerRequestReport({ requestID });
  }
});
