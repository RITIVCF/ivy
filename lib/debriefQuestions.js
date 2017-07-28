
export {
	loadActiveQuestions,
	loadInactiveQuestions
}


function loadActiveQuestions(){
	let questions = [];
	questions = loadQuestions(true);
	return questions;
}

function loadInactiveQuestions(){
	let questions = [];
	questions = loadQuestions(false);
	return questions;
}

function loadQuestions(areActive){
	let questions = [];

	questions = DebriefQuestions.find({active: areActive}).fetch().reverse();

	return questions;
}
