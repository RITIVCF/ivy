// Makes sure jobCollection var is in global scope
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

delayJobNumberOfIntervals = function(job, number){
	let interval = getInterval();
	job.pause();
	job.after( addDays(new Date(), interval*number) );
	job.save();
	job.resume();
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
