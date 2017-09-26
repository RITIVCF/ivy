

export {
	isSendMailGateOpen
}

function isSendMailGateOpen(){
	const statusObj = Options.findOne("emailqueuestatus");
	if(statusObj){
		return statusObj.open;
	} else {
		Meteor.isServer && log.error("Cannot find email queue status object in Options collection.");
		return false;
	}

}




// Status and potential actions
/*
	job.pause(callback(error, result)) - ready, waiting

	job.resume(callback(error, result)) - paused

	job.ready(options, callback) - waiting
		(will not promote to ready, unless dependencies are
		satisfied, or the force flag is used: options = {force: true})

	job.cancel(options, callback(error, result)) - nin: [completed, failed, cancelled]
		options: {
			antecedents: Default false, // also cancel jobs that this one is dependent on
			dependents: Default true // also cancel jobs that depend on this one
		}

	job.restart(options, callback(err, result)) - failed, cancelled
		options: {
			retries: int, -- Number of additional retries to attempt before failing with job.retry(). Default: 1.
			until: Date, -- Keep retrying until this Date, or until the number of retries is exhausted, whichever comes first.
			antecedents: bool, -- Also restart all 'cancelled' or 'failed' jobs that this job depends on. Default: true
			dependents: bool -- Also restart all 'cancelled' or 'failed' jobs that depend on this job. Default: false
		}

	job.rerun(options, callback(err, result)) - clones a job and runs it again
		options: {
		repeats: int, -- Number of times to repeat the job, as with job.repeat().
		until: Date, -- Keep repeating until this Date, or until the number of repeats is exhausted, whichever comes first. Default: prior value of until
		wait: -- Time to wait between reruns. Default is the existing job.repeat({ wait: ms }) setting for the job.
	}

	job.remove(options, callback(err, result)) - removes job from collection

*/
