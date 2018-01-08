// Imports
import { Random } from 'meteor/random';
import { getUsers, getUser } from '/lib/users.js';

export {
  getPrayerRequest,
  getPrayerRequests,
  submitPrayerRequest,
  submitPrayerRequestUpdate,
  publishPrayerRequest
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

  console.log("Request: ", prayerRequest);

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
    sendEmailToGroup( 'prayergroup' );
  }
  sendEmailToGroup( 'prayergroupleaders' );


  function sendEmailToGroup( groupID ){
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

}

function getRequestHTMLForNotification({ name, content, createdAt, audience, updates }) {
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

function updatePrayerRequest({ requestID, update }) {
  PrayerRequests.update(requestID, {$set: update});
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
