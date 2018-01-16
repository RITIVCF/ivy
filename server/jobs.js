
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
	jobCollection.restartJobs([jid]);
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
	return jobCollection.readyJobs([jid]);
}

function rerunJob(jid){
	const job = jobCollection.getJob(jid);
	job.rerun();
}

function removeJob(jid){
	jobCollection.removeJobs([jid]);
}
