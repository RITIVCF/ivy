// Makes sure jobCollection var is in global scope
import { sendEmailCenterEmail, sendEventFollowUpEmail } from '/lib/emails.js';
import { getUsers } from '/lib/users.js';
import { processExpiredContacts } from '/server/contactStatus.js';
import { shouldCalculateFunnel } from '/lib/contactStatus.js';
import { log } from '/server/logger.js';
import { isSendMailGateOpen } from '/lib/jobs.js';

export {
	openSendMailGate,
	closeSendMailGate,
	newEmailJob
}


jobCollection.startJobServer();

createJobAndDelay = function(uid, delayAmount, notValidIntervals = 0){
	let newJob = newFunnelCalulateJob(uid, notValidIntervals);

	delayJobNumberOfIntervals(newJob, delayAmount);
}

createNewJob = function(type, data){
	let jobDoc = {};
	if(!!data){
		jobDoc = data;
	}
	return new Job(jobCollection, type, jobDoc);
}

newFunnelCalulateJob = function(uid, notValidIntervals = 0){
	let jobDoc = {
		uid: uid,
		notValidIntervals: notValidIntervals
	};

	return createNewJob('checkFunnelStatus', jobDoc);
}

newEmailJob = function(emid){
	let jobDoc = {
		emid: emid
	};

	return createNewJob('email', jobDoc);
}

newEventFollowUpEmailJob = function(eid, uid){
	let jobDoc = {
		eid: eid,
		uid: uid
	}

	return createNewJob('sendEventFollowUpEmail', jobDoc);
}

newSendEmailJob = function(emailObj){
	// this requires an Email package email obj like
	//  {
	//		to:
	//		from:
	//		subject:
	//		html:
	//  }

	const jobDoc = {
		email: emailObj
	}

	let job = createNewJob('sendEmail', jobDoc);
	job.save();
	return job;
}

scheduleJobAndSubmit = function (job, afterValue){
	job.after( afterValue );
	job.save();
}

setNewJobAfterValue = function (job, afterValue){
	job.pause();
	job.after( afterValue );
	job.save();
	job.resume();
}

getJobCollectionJob = function(jid){
	return jobCollection.getJob(jid);
}

getJobCollectionJobByUserId = function(uid){
	let job = jobCollection.findOne({"data.uid": uid});

	// If job doesn't exist, create job
	if(!job){
		job = newFunnelCalulateJob(uid);
	}
	// Job exists, find it.
	else{
		job = getJobCollectionJob(job._id);
	}
	return job;
}

getJobCollectionJobByData = function(dataObj){
	let jobObj = jobCollection.findOne(dataObj);
	let job = {};
	if(!jobObj){
		return false;
	}
	else{
		job = getJobCollectionJob(jobObj._id);
		return job;
	}
}

getJobCollectionJobByType = function(type){
	let jobObj = jobCollection.findOne({type: type});
	let job;
	if(!!jobObj){
		job = getJobCollectionJob(jobObj._id);
	}
	return job;
}

getCheckFunnelStatusJobByUserId = function(uid) {
	let jobObj = jobCollection.findOne({"data.uid": uid, type: "checkFunnelStatus"});
	let job = {};
	if(!jobObj){
		return false;
	}
	else{
		job = getJobCollectionJob(jobObj._id);
		return job;
	}
}

removeJobCollectionJob = function(data){
	jobCollection.remove(data);
}

removeJob = function(jid) {
	jobCollection.remove({_id: jid});
}

delayJobNumberOfIntervals = function(job, number){
	let interval = getInterval();
	let newValue = addDays(new Date(), interval*number);

	setNewJobAfterValue(job, newValue);
}

shouldJobCalculate = function(testVal, numberOfValidIntervals){
	let shouldICalculate = false;

	if(numberOfValidIntervals >= (testVal)){
		shouldICalculate = true;
	}
	else{
		shouldICalculate = false;
	}

	return shouldICalculate;
}

export function failJob(job, reason){
	job.fail(
	  {
	    reason: reason
	  },
	  {
	    fatal: false  // Default case
	  },
	  function (err, result) {
	    if (result) {
	      // Status updated
	    }
	  }
	);
}

export function restartJob(job){
	job.restart(
	  {
	    antecedents: true,  // Also restart all jobs that must
	                        // complete before this job can run.
	    retries: 0          // Only try one more time. This is the default.
	  },
	  function (err, result) {
	    if (result) {
	      // Status updated
	    }
	  }
	);
}



const checkFunnelStatusOptions = {
	pollInterval: 2000
};

Job.processJobs('jobQueue', 'checkFunnelStatus', checkFunnelStatusOptions, function(job, cb){
	try {
		let data = job.data;
		let threshold = getThreshold();
		let period = getPeriod();
		let currentStatus = getUserFunnelStatus(data.uid);
		let shouldICalculate;
		let numberOfValidIntervals;
		let intervalsToTest;

		if(shouldCalculateFunnel(data.uid)){
			if(currentStatus == "Crowd"){
				intervalsToTest = period-threshold;
				numberOfValidIntervals = getNumberOfValidIntervals(intervalsToTest + data.notValidIntervals);
				shouldICalculate = shouldJobCalculate(intervalsToTest, numberOfValidIntervals);
			}
			else{
				intervalsToTest = threshold;
				numberOfValidIntervals = getNumberOfValidIntervals(intervalsToTest + data.notValidIntervals);
				shouldICalculate = shouldJobCalculate(intervalsToTest, numberOfValidIntervals);

			}

			if(shouldICalculate){
				let result = calculateFunnelStatus(data.uid);

				switch(result){
					case "Contact":
						break;
					case "Crowd":
						// Create new job
						let job = newFunnelCalulateJob(data.uid);
						createJobAndDelay(data.uid, period-threshold);
						break;
					default:
						createJobAndDelay(data.uid, threshold);
				}
			}
			else{
				let numberOfIntervalsToAdd = intervalsToTest - numberOfValidIntervals;

				createJobAndDelay(data.uid,	// Data
					numberOfIntervalsToAdd,  	// Delay Amount
					data.notValidIntervals + numberOfIntervalsToAdd  // notValidIntervals
				);

			}
		}

		// Mark as finished
		job.done();
		//job.remove();
		cb();

	} catch (e) {
		let user = Meteor.users.findOne(job.data.uid);
		console.error("Error in checkFunnelStatus job ("+job._id+"): ", e);
		failJob(job, e);
		sendErrorEmail(
			"checkFunnelStatus Job " + user.name,
			"Debug: <br>" + "Data.uid: " + job.data.uid + "<br><br>" + e
		);

	}

});



const emailOptions = {pollInterval: 2000};
Job.processJobs('jobQueue', 'email', emailOptions, function(job, cb){
	try {
		sendEmailCenterEmail(job.data.emid);

		// Mark as finished
		job.done();
		//job.remove();
		cb();

	} catch (e) {
		console.error("Error in email job (emid: "+job.data.emid+"): ", e);
		failJob(job, e);
		sendErrorEmail(
			"email Job",
			"Debug: <br>" + "Data.emid: " + job.data.emid + "<br><br>" + e
		);

	}



});

Job.processJobs('jobQueue', 'sendEventFollowUpEmail', function(job, cb){
	let data = job.data;

	try {
		// Send follow up email passing in event ID and user ID
		sendEventFollowUpEmail(data.eid, data.uid);

		//Mark as finished
		job.done();
		//job.remove();
		cb();

	} catch (e) {
		console.error("Error in sendEventFollowUpEmail job ("+job._id+"): ", e);
		let user = Meteor.users.findOne(data.uid);
		failJob(job, e);
		sendErrorEmail(
			"sendEventFollowUpEmail job " + user.name,
			"Debug: <br>" + "Data.uid: " + data.uid + "<br><br>" + e
		);

	}

});


// Send Email throttler and sender
Meteor.setInterval(()=>{
	if(isSendMailGateOpen()){
		try {
			const jobs = jobCollection.getWork('sendEmail',{maxJobs: 1});
			if(jobs.length > 0){
				try {
					const job = jobs[0]._doc;
					sendEmail(job.data.email);
					jobs[0].done("Email sent to " + job.data.email.to + " successfully!", (error, result)=>{
						if(error){
							log.error('Error marking as done: \n' + error);
						}
					});
				} catch (e) {
					log.error("Error sending email: \n" + e);
					jobs[0].fail(
						{
							reason: "Failed to send email",
							code: 1
						}
					);
				}

			}
		} catch (e) {
			let data = {};
			if(job){
				data.job = job;
			}
			data.error = e;
			try{
				closeSendMailGate();
			} catch (closeGateError) {
				log.error("Send email failed. Close gate failed. This is still running.", {error: closeGateError});
			}
			log.error("Send email failed. Gate closed.", data);
		}
	}

}, 10000);

function closeSendMailGate(){
	Options.update("emailqueuestatus", {$set: {open: false}});
}

function openSendMailGate(){
	Options.update("emailqueuestatus", {$set: {open: true}});
}


Job.processJobs('jobQueue', 'processExpiredContacts', function(job, cb){
	try {
		processExpiredContacts();

		//Mark as finished
		job.done();
		//job.remove();
		cb();

	} catch (e) {
		console.error("Error in processExpiredContacts job ("+job._id+"): ", e);
		failJob(job, e);
		sendErrorEmail(
			"processExpiredContacts job ",
			"Debug:<br><br>" + e
		);

	}

});

// Intialize expiredContactsJob
function newProcessExpiredContactsJob(){
	let newJob = createNewJob('processExpiredContacts');

	newJob.repeat({
		schedule: jobCollection.later.parse.recur().on(7).month()
	});

	newJob.save();
}

let processExpiredContactsJob = getJobCollectionJobByType("processExpiredContacts");
if(!processExpiredContactsJob){
	newProcessExpiredContactsJob();
}



//export const jobQueue = jobCollection.processJobs();
