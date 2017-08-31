import {
	loadJobs,
	cancelJob,
	restartJob,
	getWork
} from '/server/jobs.js';

Meteor.methods({
	getJobs(query){
		return loadJobs(query);
	},
	cancelJob(jid){
		cancelJob(jid);
	},
	restartJob(jid){
		restartJob(jid);
	},
	getWork(type){
		return getWork(type);
	}
});
