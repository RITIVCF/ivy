
export {
	loadJobs,
	cancelJob,
	restartJob,
	pauseJob,
	resumeJob,
	readyJob,
	rerunJob,
	removeJob,
	getWork
}

function loadJobs(query){
	return jobCollection.find(query).fetch();
}

function cancelJob(jid){
	jobCollection.cancelJobs([jid]);
}

function restartJob(jid){
	const job = jobCollection.find().fetch();
	jobCollection.restartJobs([jid]);
	getWork(job.type);
}

function getWork(type){
	return jobCollection.getWork(type);
}

function pauseJob(jid){
	jobCollection.pauseJobs([jid]);
}

function resumeJob(jid){
	jobCollection.resumeJobs([jid])
}

function readyJob(jid){
	jobCollection.readyJobs([jid]);
}

function rerunJob(jid){
	const job = jobCollection.getJob(jid);
	job.rerun();
}

function removeJob(jid){
	jobCollection.removeJobs([jid]);
}
