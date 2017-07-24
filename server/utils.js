

sendErrorEmail = function(subject, html){
	Email.send({
		to: "ivyritivcf@googlegroups.com",
		from: "no-reply@ivy.rit.edu",
		subject: "Error Notification: " + subject,
		html: html
	});
}
