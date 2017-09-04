import {
	loadJobs,
	cancelJob,
	restartJob,
	pauseJob,
	resumeJob,
	readyJob,
	rerunJob,
	removeJob,
	getWork
} from '/server/jobs.js';
import {
	openSendMailGate,
	closeSendMailGate
} from '/server/jobCollection.js';

Meteor.methods({
	getJobs(query){
		return loadJobs(query);
	},
	cancelJob(jid){
		if(checkPermission("admin")){
			cancelJob(jid);
		}
	},
	restartJob(jid){
		if(checkPermission("admin")){
			restartJob(jid);
		}
	},
	pauseJob(jid){
		if(checkPermission("admin")){
			pauseJob(jid);
		}
	},
	resumeJob(jid){
		if(checkPermission("admin")){
			resumeJob(jid);
		}
	},
	readyJob(jid){
		if(checkPermission("admin")){
			readyJob
		}
	},
	rerunJob(jid){
		if(checkPermission("admin")){
			rerunJob(jid);
		}
	},
	removeJob(jid){
		if(checkPermission("admin")){
			removeJob(jid);
		}
	},
	getWork(type){
		return getWork(type);
	},
	openSendMailGate(){
		if(checkPermission("admin")){
			openSendMailGate();
		}
	},
	closeSendMailGate(){
		if(checkPermission("admin")){
			closeSendMailGate();
		}
	}
});
