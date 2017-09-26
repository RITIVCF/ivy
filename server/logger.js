import { Logger } from 'meteor/ostrio:logger';
import { LoggerMongo } from 'meteor/ostrio:loggermongo';

export {
	log
}

// Initialize Logger:
const log = new Logger();
const AppLogs = new Mongo.Collection('AppLogs');

// Initialize LoggerMongo with collection instance:
const LogMongo = new LoggerMongo(log, {
  collection: AppLogs
});

// Enable LoggerMongo with default settings:
LogMongo.enable();


// store original Meteor error
const originalMeteorDebug = Meteor._debug;
Meteor._debug =(message, stack) => {
  log.error(message + "\n" + stack);
  return originalMeteorDebug.apply(this, arguments);
};



// Manual Logging
// https://github.com/VeliovGroup/Meteor-logger-mongo#log-message-isomorphic

// Logging schema
// https://github.com/VeliovGroup/Meteor-logger-mongo#logging-collection-schema
