
export {
	loadJobs,
	cancelJob,
	restartJob,
	getWork
}

function loadJobs(){
	return jobCollection.find().fetch();
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


// Randon change
