import React, {Component} from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import JobManagerList from './JobManagerList';

export default JobManagerListContainer = createContainer(({ type, status }) => {
	console.log("Container: ", {type: type, status: status});
	const sub = Meteor.subscribe("jobManager", type, status);
  const loading = !sub.ready();
	const jobs = load({ type: type, status: status });
  return {
    loading,
    jobs
  };
}, JobManagerList);


function load({ type='', status=[] }){
	let query = {};
	if(type){
		query.type = type;
	}
	query.status = {$in: status};
	return jobCollection.find(query, {sort: {after: 1}}).fetch();
}
