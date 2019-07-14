/* [QUIZ ENGINE] */

//picks #'QUESTIONS_NUM' random questions without repetition from js-quiz-questions.js
var len = myquestions.length;
var questions = [];
var QUESTIONS_NUM = 5;

for (var i = 0; i<QUESTIONS_NUM; i++) {
    var randy = Math.floor(Math.random() * len);  
    questions[i] = myquestions[randy];

    for (k=0; k<=i-1; k++) {
    if (questions[k] == questions[i]) {
        i--;  // duplicate found so decrement i
        }
    }
}

var quiz = {
  draw : function () {
  // quiz.draw() : draw the quiz

    // Fetch the HTML quiz wrapper
    var wrapper = document.getElementById("quiz-wrap");

    // Loop through all the questions
    // Create all the necessary HTML elements
    for (var index in questions) {
      var number = parseInt(index) + 1; // The current question number
      var qwrap = document.createElement("div"); // A div wrapper to hold this question and options
      qwrap.classList.add("question"); // CSS class, for cosmetics

      // The question - <h1> header
      var question = document.createElement("h1");
      question.innerHTML = number + ") " + questions[index]['q'];
      qwrap.appendChild(question);

      // The options - <input> radio buttons and <label>
      for (var oindex in questions[index]['o']) {
        // The <label> tag
        var label = document.createElement("label");
        qwrap.appendChild(label);

        // The <option> tag
        var option = document.createElement("input");
        option.type = "radio";
        option.value = oindex;
        option.required = true;
        option.classList.add("oquiz");
        
        // A radio button group must share the same name
        option.name = "quiz-" + number;
        label.appendChild(option);

        // Add the option text
        var otext = document.createTextNode(questions[index]['o'][oindex]);
        label.appendChild(otext);
      }

      // Finally, add this question to the main HTML quiz wrapper
      wrapper.appendChild(qwrap);
    }

    // Attach submit button + event handler to the quiz wrapper
    var submitbutton = document.createElement("input");
    submitbutton.type = "submit";
    wrapper.appendChild(submitbutton);
    wrapper.addEventListener("submit", quiz.submit);
  },

  submit : function (evt) {
  // quiz.submit() : Handle the calculations when the user submits to quiz

    // Stop the form from submitting
    evt.preventDefault();
    evt.stopPropagation();

    // Remember that we added an "oquiz" class to all the options?
    // We can easily get all the selected options this way
    var selected = document.querySelectorAll(".oquiz:checked");

    // Get the score
    var score = 0;
    var wrong = "";
    var i=0;
    for (var index in questions) {
       //if the choice is correct icrement the score
      if (selected[index].value == questions[index]['a']) {
        score++;
       //else add to 'wrong' the text of the question, the choosed option, and the correct answer
      }else{

        wrong+="<br><br><b>" + questions[index].q + 
        "</b><br><font color=\"red\"><b>" + 
        "Scelta: </b></font>" + 
        selected[index].labels[0].innerText.valueOf() + 
        "<br><font color=\"green\"><b> Corretta: </b></font>" + 
        questions[index].o[Number(questions[index].a)];

        i++;
      }
    }

    //calculate the score
    var total = selected.length;
    var percent = score / total ;

    // Update and show the score
    // directly alter the inner HTML
    var html = "<h1>";
    if (percent>=0.7) {
      html += "OTTIMO!";
    } else if (percent>=0.4) {
      html += "NON MALE!";
    } else {
      html += "RIPROVA!";
    }
    html += "</h1>";
    html += "<div>HAI TOTALIZZATO " + score + " SU " + total + ".</div>";
    html += "<br><br>Risposte sbagliate:"
    //display the wrong aswers with corrections
    html += wrong;
    document.getElementById("quiz-wrap").innerHTML = html;
  }
};

/* [INIT] */
window.addEventListener("load", quiz.draw);
