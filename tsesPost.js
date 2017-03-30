// Get a reference to the database service
var database = firebase.database();
var firstName="";
var lastName="";
var phoneNumber = "";
var bestTime="";
//Question Array
var questionArray = [
"How much can you do to get through to the most difficult students?",
"How much can you do to help your students think critically?",
"How much can you do to control disruptive behavior in the classroom?",
"How much can you do to motivate students who show low interest in school work?",
"To what extent can you make your expectations clear about student behavior?",
"How much can you do to get students to believe they can do well in school work?",
"How well can you respond to difficult questions from your students?",
"How well can you establish routines to keep activities running smoothly?",
"How much can you do to help your students value learning?",
"How much can you gauge student comprehension of what you have taught?",
"To what extent can you craft good questions for your students?",
"How much can you do to foster student creativity?",
"How much can you do to get children to follow classroom rules?",
"How much can you do to improve the understanding of a student who is failing?",
"How much can you do to calm a student who is disruptive or noisy?",
"How well can you establish a classroom management system with each group of students?",
"How much can you do to adjust your lessons to the proper level for individual students?",
"How much can you use a variety of assessment strategies?",
"How well can you keep a few problem students form ruining an entire lesson?",
"To what extent can you provide an alternative explanation or example when students are confused?",
"How well can you respond to defiant students? ",
"How much can you assist families in helping their children do well in school?",
"How well can you implement alternative strategies in your classroom?",
"How well can you provide appropriate challenges for very capable students?"
];
var selectedAnswers = [];
var questionCounter = 0;
var noAns = document.getElementById("noAns");

function displayQuestion (){
	document.getElementById("question").innerHTML = questionArray[questionCounter-1];

}

function clearCheck() {
	$('input').removeAttr('checked');
}

function displayQuestionNumber() {
	document.getElementById("questionNo").innerHTML = "Question " + (questionCounter) + " / " + questionArray.length;
}

function collectData() {

  database.ref().child(firstName + " " + lastName).set(selectedAnswers);
  document.getElementById("likertForm").style.display = "none";
  document.getElementById("mainPara").style.display = "none";
  document.getElementById("mainHeader").innerHTML = "Thank you so much for your time!!";
  document.getElementById("next").style.display = "none";


}
//**************************************
//*********Change the (3-1) to be questionArray.length -1
//***********************************

function buttonClicked() {
	console.log(questionCounter+" "+ selectedAnswers);
		
	if(questionCounter == 0) {
		firstName = document.getElementById("firstName").value;
		lastName = document.getElementById("lastName").value;
		phoneNumber = document.getElementById("cellPhone").value;
		bestTime = document.getElementById("bestTime").value;

		
		if(firstName == ""){
				//noAns.style.display = "inline";
				document.getElementById("firstNameAlert").style.display = "block";
				return;
		} else if(lastName=="") {

				//noAns.style.display = "inline";
				document.getElementById("firstNameAlert").style.display = "none";
				document.getElementById("lastNameAlert").style.display = "block";
				return;
		} else if (phoneNumber==""){
				//noAns.style.display = "inline";
				document.getElementById("lastNameAlert").style.display = "none";
				document.getElementById("phoneAlert").style.display = "block";
				return;
		} else if (bestTime==""){
				//noAns.style.display = "inline";
				document.getElementById("phoneAlert").style.display = "none";
				document.getElementById("timeAlert").style.display = "block";
				return;
		} else if ($("input[name='checkbox']:checked").size() ==0) {
				//noAns.style.display = "inline";
				document.getElementById("timeAlert").style.display = "none";
				document.getElementById("checkboxAlert").style.display = "block";
				return;
		} else {
			//noAns.style.display = "none";
			selectedAnswers.push(firstName);
			selectedAnswers.push(lastName);
			selectedAnswers.push(phoneNumber);
			selectedAnswers.push(bestTime);
			var course = "";
			document.getElementById("checkboxAlert").style.display = "none";
			$("input:checkbox[name=checkbox]:checked").each(function(){
					course = course + " " + $(this).val();
			   
			});
			selectedAnswers.push(course);
		}

		
		document.getElementById("nameCourse").style.display = "none";
		document.getElementById("likertForm").style.display = "block";
		questionCounter++;
		displayQuestion();
		clearCheck();
		displayQuestionNumber();
	}	else if(questionCounter < (questionArray.length)) {
			
		if ($("input[name='likert']:checked").size() ==0) {
			noAns.style.display = "inline";
			return;
		} else {
			noAns.style.display = "none";
			var answer = $("input[name='likert']:checked").val()
			selectedAnswers.push(answer);
			console.log(questionCounter+" "+ selectedAnswers);
			//console.log(selectedAnswers);
		}
	//next question
		questionCounter++;
		displayQuestion();
		clearCheck();
		displayQuestionNumber();


		if (questionCounter == (questionArray.length)) {
			console.log("switch to submit");
			document.getElementById("next").innerHTML = "Submit";
			document.getElementById("next").className = "btn btn-success";

		}

	} else {
		if ($("input[name='likert']:checked").size() ==0) {
			noAns.style.display = "inline";
			return;
		} else {
			noAns.style.display = "none";
			var answer = $("input[name='likert']:checked").val()
			selectedAnswers.push(answer);
			console.log(questionCounter+" "+ selectedAnswers);
			//console.log(selectedAnswers);
		}

		collectData();
		return;
	}

}






$(document).ready(function() {
displayQuestion();
displayQuestionNumber();
clearCheck();

})




