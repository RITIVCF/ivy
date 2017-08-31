// Makes sure jobCollection var is in global scope
import { sendNewsletter, sendEventFollowUpEmail } from '/lib/emails.js';
import { getUsers } from '/lib/users.js';
import { processExpiredContacts } from '/server/contactStatus.js';
import { shouldCalculateFunnel } from '/lib/contactStatus.js';


jobCollection = JobCollection('jobQueue');
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

newNewsletterJob = function(emid){
	let jobDoc = {
		emid: emid
	};

	return createNewJob('sendNewsletter', jobDoc);
}

newEventFollowUpEmailJob = function(eid, uid){
	let jobDoc = {
		eid: eid,
		uid: uid
	}

	return createNewJob('sendEventFollowUpEmail', jobDoc);
}

newEmailJob = function(emailObj){
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



const sendNewsletterOptions = {pollInterval: 2000};
Job.processJobs('jobQueue', 'sendNewsletter', sendNewsletterOptions, function(job, cb){
	try {
		sendNewsletter(job.data.emid);

		// Mark as finished
		job.done();
		//job.remove();
		cb();

	} catch (e) {
		console.error("Error in sendNewsletter job (emid: "+job.data.emid+"): ", e);
		failJob(job, e);
		sendErrorEmail(
			"sendNewsletter Job",
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
let sendEmailFailed = false;
Meteor.setInterval(()=>{
	if(!sendEmailFailed){
		try {
			const jobs = jobCollection.getWork('sendEmail',{maxJobs: 1});
			console.log(jobs);
			if(jobs.length > 0){
				const job = jobs[0]._doc;
				console.log("Executing job: ", job._id);
				sendEmail(job.data.email);
				jobs[0].done();
			}
		} catch (e) {
			sendEmailFailed = true;
		}
	}

}, 10000);


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
