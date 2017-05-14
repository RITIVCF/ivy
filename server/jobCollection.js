// Makes sure jobCollection var is in global scope
var jobCollection = JobCollection('jobQueue');
jobCollection.startJobServer();

createJobAndDelay = function(uid, delayAmount, notValidIntervals = 0){
	console.log("<<createJobAndDelay>>");
	let newJob = newFunnelCalulateJob(uid, notValidIntervals);

	delayJobNumberOfIntervals(newJob, delayAmount);
}

newFunnelCalulateJob = function(uid, notValidIntervals = 0){
	console.log("<<newFunnelCalulateJob>>");
	return new Job(jobCollection, 'checkFunnelStatus',
		{
			uid: uid,
			notValidIntervals: notValidIntervals
		}
	);
}

getJobCollectionJob = function(jid){
	console.log("<<getJobCollectionJob>>");
	return jobCollection.getJob(jid);
}

getJobCollectionJobByUserId = function(uid){
	console.log("<getJobCollectionJobByUserId>");
	let job = jobCollection.findOne({"data.uid": uid});

	// If job doesn't exist, create job
	if(!job){
		console.log("A job does not already exist.");
		job = newFunnelCalulateJob(uid);
	}
	// Job exists, find it.
	else{
		console.log("A job does already exist.");
		job = getJobCollectionJob(job._id);
	}
	console.log("</getJobCollectionJob>");
	return job;
}

delayJobNumberOfIntervals = function(job, number){
	console.log("<<delayJobNumberOfIntervals>>");
	let interval = getInterval();
	job.pause();
	console.log("I am paused");
	job.after( addMinutes(new Date(), interval*number) );
	console.log("I updated my after time");
	job.save();
	console.log("I saved");
	job.resume();
	console.log("I resumed");
}

shouldJobCalculate = function(testVal, numberOfValidIntervals){
	console.log("<<shouldJobCalculate>>");
	let shouldICalculate = false;

	if(numberOfValidIntervals >= (testVal)){
		console.log("Number of valid intervals is greater than or equal to test value.");
		console.log("testVal: ", testVal);
		console.log("Number of valid intervals: ", numberOfValidIntervals);
		shouldICalculate = true;
	}
	else{
		console.log("Number of valid intervals is less than test value.");
		console.log("testVal: ", testVal);
		console.log("Number of valid intervals: ", numberOfValidIntervals);
		shouldICalculate = false;
	}

	return shouldICalculate;
}

//let worker =
Job.processJobs('jobQueue', 'checkFunnelStatus', function(job, cb){
	console.log("<<checkFunnelStatus>> => ", Meteor.users.findOne(job.data.uid).name);
	console.log(new Date());
	let data = job.data;
	let threshold = getThreshold();
	let period = getPeriod();
	let currentStatus = getUserStatus(data.uid);
	console.log("Current status: ", currentStatus);
	let shouldICalculate;
	let numberOfValidIntervals;
	let intervalsToTest;
	console.log("data.notValidIntervals: ", data.notValidIntervals);

	if(currentStatus == "Crowd"){
		console.log("Current Status is Crowd.");
		intervalsToTest = period-threshold;
		numberOfValidIntervals = getNumberOfValidIntervals(intervalsToTest + data.notValidIntervals);
		console.log("Number of valid intervals is: ", numberOfValidIntervals);
		shouldICalculate = shouldJobCalculate(intervalsToTest, numberOfValidIntervals);
	}
	else{
		console.log("Current status is not Crowd.");
		intervalsToTest = threshold;
		numberOfValidIntervals = getNumberOfValidIntervals(intervalsToTest + data.notValidIntervals);
		console.log("Number of valid intervals is: ", numberOfValidIntervals);
		shouldICalculate = shouldJobCalculate(intervalsToTest, numberOfValidIntervals);

	}

	if(shouldICalculate){
		console.log("I should calculate");
		let result = calculateFunnelStatus(data.uid);

		switch(result){
			case "Contact":
				console.log("I am a Contact now. Do not create a new job for me because I am a sad individual because I stopped coming.");
				break;
			case "Crowd":
				console.log("I am a Crowd. I need a new job to calculate again. Create new job moved back by period - threshold");
				// Create new job
				let job = newFunnelCalulateJob(data.uid);
				createJobAndDelay(data.uid, period-threshold);
				console.log("I created a new job and moved it back period-threshold.");
				break;
			default:
				console.log("I am not a Crowd. I need a new job to calculate again. Create new job moved back by threshold");
				createJobAndDelay(data.uid, threshold);
				console.log("I created a new job and moved it back by threshold.");
		}
	}
	else{
		console.log("I should not calculate. Number of valid intervals is less than test value.");
		let numberOfIntervalsToAdd = intervalsToTest - numberOfValidIntervals;

		createJobAndDelay(data.uid,	// Data
			numberOfIntervalsToAdd,  	// Delay Amount
			data.notValidIntervals + numberOfIntervalsToAdd  // notValidIntervals
		);

	}

	// Mark as finished
	console.log("I am finishing", job.data);
	job.done();
	job.remove();
	cb();


});
