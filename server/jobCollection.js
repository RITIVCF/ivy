// Makes sure jobCollection var is in global scope
import { sendNewsletter } from '/lib/emails.js';
import { getUsers } from '/lib/users.js';

var jobCollection = JobCollection('jobQueue');
jobCollection.startJobServer();

createJobAndDelay = function(uid, delayAmount, notValidIntervals = 0){
	let newJob = newFunnelCalulateJob(uid, notValidIntervals);

	delayJobNumberOfIntervals(newJob, delayAmount);
}

newFunnelCalulateJob = function(uid, notValidIntervals = 0){
	return new Job(jobCollection, 'checkFunnelStatus',
		{
			uid: uid,
			notValidIntervals: notValidIntervals
		}
	);
}

newNewsletterJob = function(emid){
	return new Job(jobCollection, 'sendNewsletter',
		{
			emid: emid
		}
	);
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
	}
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

//let worker =
Job.processJobs('jobQueue', 'checkFunnelStatus', function(job, cb){
	let data = job.data;
	let threshold = getThreshold();
	let period = getPeriod();
	let currentStatus = getUserStatus(data.uid);
	let shouldICalculate;
	let numberOfValidIntervals;
	let intervalsToTest;

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

	// Mark as finished
	job.done();
	job.remove();
	cb();


});




Job.processJobs('jobQueue', 'sendNewsletter', function(job, cb){
	
	sendNewsletter(job.data.emid);

	// Mark as finished
	job.done();
	job.remove();
	cb();


});
