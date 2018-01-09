// Imports
import { getUsers } from '/lib/users.js';
import { failJob } from '/server/jobCollection';

export {
  getPrayerRequest,
  getPrayerRequests,
  submitPrayerRequest,
  submitPrayerRequestUpdate,
  publishPrayerRequest,
  reportPrayerRequest,
  acceptPrayerRequestReport,
  rejectPrayerRequestReport,
  prayForRequest,
  deletePrayerRequest,
  sendPrayedForNotifications
};

const FROM = "InterVarsity Christian Fellowship <ivcf.rit.edu>";
const IVY_FROM = "Ivy Information System <ivy.rit.edu>";
const CONFIRMATION_LINK = 'http://ivcf.rit.edu/prayerwall/';

function submitPrayerRequest({ name, email, content, audience }) {
  const requestID = insertPrayerRequest({ name, email, content, audience });

  sendEmailConfirmation({
    requesterEmail: email,
    requestContent: content,
    requestID: requestID
  });
}

function submitPrayerRequestUpdate({  prayerRequestID, content, type }) {
  let prayerRequest = insertPrayerRequestUpdate({
    prayerRequestID,
    content,
    type
  });

  // send notification
  notify( prayerRequest, "update" );
}

function sendEmailConfirmation({ requesterEmail, requestContent, requestID }) {
  Email.send({
    to: requesterEmail,
    from: FROM,
    subject: `Your Prayer Request: Please Confirm Email`,
    html: getConfirmationBody({ requestContent, requestID })
  });
}

function getConfirmationBody({ requestContent, requestID }) {
  return `
    <p>Thanks for submitting a Prayer Request:</p>
    <p>${requestContent}</p>
    <p>
      Please follow the link below to confirm your email address. This helps us
      keep spammers from submitting to the Wall.
    </p>
    <p>${CONFIRMATION_LINK + requestID}</p>
    <p>This link can also be used to view your request to:</p>
    <ul>
      <li>See how many people have prayed for you</li>
      <li>Make updates to your request such as new prayer requests and praises.</li>
    </ul>
    <p>
      - InterVarsity Christian Fellowship's Prayer Team
      <a href="mailto:ivcf.rit.edu">ivcf.rit.edu</a>
    </p>
  `;
}

function notify( request, notifyType ) {
  const { name, content, createdAt, audience, updates } = request;

  let subject = "";
  let notificationBody = "";

  if ( notifyType == "request" ) {
    subject = "New Prayer Request";
    notificationBody = `<p>A new request has been submitted...</p>`;
  } else if ( notifyType == "update" ) {
    subject = "New Prayer Request Update";
    notificationBody = `<p>A new prayer request update has been submitted...</p>`;
  } else {
    throw 'Invalid notifyType provided.';
  }

  notificationBody += getRequestHTMLForNotification(request);
  notificationBody += `<p>- Ivy</p>`;

  if ( audience != "Leaders" ) {
    sendEmailToGroup({
      groupID: 'prayergroup',
      subject,
      notificationBody
    });

  }

  sendEmailToGroup({
    groupID: 'prayergroupleaders',
    subject,
    notificationBody
  });

}

function sendEmailToGroup({ groupID, subject, notificationBody }){
  const group = Groups.findOne( groupID );
  const users = getUsers({_id: {$in: group.users}});
  users.forEach((user)=>{
    Email.send({
      to: user.getEmail(),
      from: IVY_FROM,
      subject: subject,
      html: notificationBody
    });
  });
}

function getRequestHTMLForNotification({ name, content, audience, updates }) {
  let begin = `
    <p>
      Name: ${name}<br>
      Audience: ${audience}
      Request:<br>
      ${content}
    </p>
    <p>`;
  let updatesHTML = '';
  updates.forEach(({ content, createdAt, type })=>{
    updatesHTML += `
      --- ${type} ----- ${dateFormat(createdAt, 'MMM Do')} ---<br>
      ${content}<br>
    `;
  });

    let end = `</p>`;
  return begin + updatesHTML + end;
}

function publishPrayerRequest({ requestID }) {
  const prayerRequest = getPrayerRequest( requestID );

  if ( !prayerRequest.published ) {
    // If not already published, do so, and notify
    updatePrayerRequest({ requestID, update: {published: true} });

    // send new request notification
    notify( prayerRequest, 'request' );
  }

}

function prayForRequest({ requestID }) {
  return PrayerRequests.update( requestID, {
    $inc: { prayedForCount: 1 },
    $set: { newPrayers: true }
  });
}

function reportPrayerRequest({ requestID }) {
  const leadersPortalLink = process.env.ROOT_URL + '/prayergroup';
  const HTML = `
    <p>
      Someone reported a prayer request. Please follow the link below to approve or reject the request.
    </p>
    <p><a href="${leadersPortalLink}">${leadersPortalLink}</a></p>
  `;

  sendEmailToGroup({
    groupID: 'prayergroupleaders',
    subject: "Someone Reported a Prayer Request",
    notificationBody: HTML
  });

  return updatePrayerRequest({
    requestID,
    update: {reported: true}
  });
}

function acceptPrayerRequestReport({ requestID }){
  // Delete the request. We don't need to keep it
  return PrayerRequests.remove({ _id: requestID, reported: true });
}

function rejectPrayerRequestReport({ requestID }){
  return updatePrayerRequest({
    requestID,
    update: {reported: false}
  });
}

// Generic functions for handling DB stuff

function updatePrayerRequest({ requestID, update }) {
  return PrayerRequests.update(requestID, {$set: update});
}

function getPrayerRequest(query){
  return PrayerRequests.findOne(query);
}

function getPrayerRequests(query){
  return PrayerRequests.find(query);
}

function insertPrayerRequest({name, email, content, audience }){
  if ( name == "") {
    name = "Anonymous";
  }
  const prayerRequest = {
    ...defaultPrayerRequest(),
    name,
    email,
    content,
    audience
  };
  return PrayerRequests.insert(prayerRequest);
}

function insertPrayerRequestUpdate({ prayerRequestID, content, type }){
  const update = {
    ...defaultPrayerRequestUpdate(),
    content,
    type
  };
  PrayerRequests.update(prayerRequestID, {$addToSet: {updates: update}});
  return getPrayerRequest(prayerRequestID);
}

function deletePrayerRequest({ requestID }){
  return PrayerRequests.remove({ _id: requestID });
}

function defaultPrayerRequest() {
  return {
    name: '',
    email: '',
    content: '',
    createdAt: new Date(),
    published: false,
    reported: false,
    audience: "Leaders",
    prayedForCount: 0,
    newPrayers: false,
    updates: []
  };
}

function defaultPrayerRequestUpdate() {
  return {
    type: "Request", //["Request", "Praise"],
    createdAt: new Date(),
    content: ''
  };
}


// Prayer Wall Jobs
// - Set up the worker to process the job runs
// - If job not created, create it
// - Define functions used in jobs
const PRAYED_FOR_NOTIFICATION_JOB_TYPE = "sendPrayedForNotifications";
Job.processJobs('jobQueue', PRAYED_FOR_NOTIFICATION_JOB_TYPE, function(job, cb){
	try {
		sendPrayedForNotifications();

		//Mark as finished
		job.done();
		//job.remove();
		cb();

	} catch (e) {
		console.error(`Error in ${PRAYED_FOR_NOTIFICATION_JOB_TYPE} job (`+job._id+"): ", e);
		failJob(job, e);
		sendErrorEmail(
			PRAYED_FOR_NOTIFICATION_JOB_TYPE +" job ",
			"Debug:<br><br>" + e
		);

	}

});

// If job not created, create it
const existingJob = jobCollection.findOne({type: PRAYED_FOR_NOTIFICATION_JOB_TYPE});
if ( !existingJob ) {
  new Job(jobCollection, PRAYED_FOR_NOTIFICATION_JOB_TYPE, {})
  .repeat({schedule: jobCollection.later.parse.text('at 11:00 am')})
  .save();
}

function sendPrayedForNotifications() {
  let updatedRequests = getPrayerRequests({newPrayers: true});

  updatedRequests.forEach( ({ _id, email, prayedForCount }) => {
    // build message
    const HTML = `
      <p>Hi</p>
      <p>This is placeholder stuff</p>
      <p>Number of people prayed for you: ${prayedForCount}</p>
      <p>
        You can view your post here:<br>
        ${CONFIRMATION_LINK + _id}
      </p>
      <p>
        - InterVarsity Christian Fellowship's Prayer Team
        <a href="mailto:ivcf.rit.edu">ivcf.rit.edu</a>
      </p>
    `;

    // send email to requester
    Email.send({
      to: email,
      from: FROM,
      subject: "New people have prayed for you!",
      html: HTML
    });

    // Mark sent:
    updatePrayerRequest({
      requestID: _id,
      update: {newPrayers: false}
    });
  });
}
