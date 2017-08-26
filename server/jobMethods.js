import {
	loadJobs,
	cancelJob,
	restartJob,
	getWork
} from '/server/jobs.js';

Meteor.methods({
	getJobs(){
		return loadJobs();
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
