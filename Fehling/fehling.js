const start_btn = document.querySelector(".start_btn button");
const leaderboard = document.querySelector(".leaderboard button");
const info_box = document.querySelector(".instructions");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".math-quiz");
const option_list = document.querySelector(".option_list");
const timeCount = quiz_box.querySelector(".timer .timer_sec");
const timeLine = quiz_box.querySelector("header .time_line");
const timeOff = quiz_box.querySelector("header .time_text");
const next_btn = quiz_box.querySelector(".next_btn");
const result_box = document.querySelector(".result_box");
const send_result = result_box.querySelector(".buttons .restart");
const restart_quiz = result_box.querySelector(".buttons .quit");
const name_box = document.querySelector(".name_box");
const name_input = document.querySelector("#container .name");
const name_btn = document.querySelector("#container .name_btn");
const videoLink = "https://www.youtube.com/watch?v=vBMGNzRYngk"; // Bromine water test


let que_count = 0;
let counter;
let counterLine;
let timerValue = 15; // Set time
let widthValue = 0;
let userScore = 0;
let correctAns;
let username;
let gotWrongAnswer = false;


// Track options already selected
let selectedOptions = [];

name_btn.onclick = () => {
    checkName();
};

function checkName() {
    var letters = /^[A-Z\sa-z]+$/; // Allows only upper and lower alphabets with space
    name_input.value = name_input.value.match(letters);
    if (document.querySelector("#container .name").value == "") {
        name_input.value = "";
        name_input.placeholder = "Invalid Name";
    } else {
        name_input.placeholder = "Enter Your Name";
        name_box.classList.remove("activeName");
        info_box.classList.add("activeInfo");
        username = name_input.value;
        console.log("Your name is " + username);
    }
}

start_btn.onclick = () => {
    name_box.classList.add("activeName");
};
leaderboard.onclick = () => {
    document.getElementById("leaderboard_link").click();
};

exit_btn.onclick = () => {
    info_box.classList.remove("activeInfo");
};

continue_btn.onclick = () => {
    info_box.classList.remove("activeInfo");
    quiz_box.classList.add("activeQuiz");
    showQuestion(0);
    queCounter(0);
    startTimer(timerValue);
    startTimerLine(0);
};

next_btn.onclick = () => {
    if (que_count < questions.length - 1) {
        que_count++;
        showQuestion(que_count);
        queCounter(que_count);
        clearInterval(counter);
        clearInterval(counterLine);
        startTimer(timerValue);
        startTimerLine(0);
    } else {
        showResultBox();
        changeText();
    }
};

restart_quiz.onclick = () => {
    result_box.classList.remove("activeResult");
    que_count = 0;
    widthValue = 0;
    userScore = 0;
    timeOff.textContent = "Time Left";
    next_btn.style.display = "none";
    clearInterval(counterLine);
    clearInterval(counter);

    let alloptions = option_list.children.length;
    for (let i = 0; i < alloptions; i++) {
        if (option_list.children[i].textContent == correctAns) {
            option_list.children[i].classList.remove("correct");
        }
        option_list.children[i].classList.remove("disabled", "wrong");
    }
};

const questions = [
    {
        numb: 1,
        question: "Fehling's test solution is a mixture of two separate solutions. Which of the following ions are present in these solutions?",
        answer: "Potassium (K+) and hydroxide (OH-)",
        options: [
            "Sodium (Na+) and chloride (Cl-)",
            "Copper (Cu2+) and sulfate (SO42-)",
            "Potassium (K+) and hydroxide (OH-)",
            "Magnesium (Mg2+) and nitrate (NO3-)"
        ]
    },
    {
        numb: 2,
        question: "A positive Fehling's test result indicates the presence of:",
        answer: "Reducing sugars",
        options: [
            "Fats and oils",
            "Reducing sugars",
            "Inorganic salts",
            "Amino acids"
        ]
    },
    {
        numb: 3,
        question: "Fehling's test detects reducing sugars because they can:",
        answer: "Reduce copper(II) ions (Cu2+) to copper(I) ions (Cu+)",
        options: [
            "Increase the pH of a solution",
            "Reduce copper(II) ions (Cu2+) to copper(I) ions (Cu+)",
            "Form a white precipitate with barium chloride",
            "Change the color of universal indicator paper"
        ]
    },
    {
        numb: 4,
        question: "Compared to Fehling's test, Tollens' test:",
        answer: "Is more specific and primarily identifies aldehydes.",
        options: [
            "Is less specific and reacts with more types of molecules.",
            "Is more specific and primarily identifies aldehydes.",
            "Requires heating the solution for a positive result.",
            "Does not involve any color change during the test."
        ]
    },
    {
        numb: 5,
        question: "A limitation of Fehling's test is that it:",
        answer: "Cannot distinguish between all types of reducing sugars.",
        options: [
            "Is a simple and easy-to-perform test.",
            "Provides a quick visual confirmation of reducing sugars.",
            "Can be used with very small sample volumes.",
            "Cannot distinguish between all types of reducing sugars."
        ]
    }
];


function showQuestion(index) {
    const questionText = document.querySelector("#questions");
    const option1 = document.querySelector("#option1");
    const option2 = document.querySelector("#option2");
    const option3 = document.querySelector("#option3");
    const option4 = document.querySelector("#option4");
    const allOptions = option_list.children;
    for (let i = 0; i < allOptions.length; i++) {
        allOptions[i].classList.remove("correct", "wrong", "disabled");
        allOptions[i].textContent = ""; 
    }
    questionText.innerHTML = `<span>${questions[index].question}</span>`;
    option1.innerHTML = questions[index].options[0];
    option2.innerHTML = questions[index].options[1];
    option3.innerHTML = questions[index].options[2];
    option4.innerHTML = questions[index].options[3];

    option1.setAttribute("onclick", "optionSelected(this)");
    option2.setAttribute("onclick", "optionSelected(this)");
    option3.setAttribute("onclick", "optionSelected(this)");
    option4.setAttribute("onclick", "optionSelected(this)");
    
    correctAns = questions[index].answer;
}

function optionSelected(answer) {
    let userAns = answer.textContent;
    let correctAns = questions[que_count].answer;
    const allOptions = option_list.children.length;

    if (userAns === correctAns) {
        answer.classList.add("correct");
        console.log("Correct Answer");
        answer.insertAdjacentHTML("beforeend", '<div class="icon tick"><i class="fa-solid fa-check"></i></div>');
        userScore += 1;
    } else {
        answer.classList.add("wrong");
        console.log("Wrong Answer");
        answer.insertAdjacentHTML("beforeend", '<div class="icon cross"><i class="fa-solid fa-xmark"></i></div>');

        // If the answer is incorrect, highlight the correct answer
        for (let i = 0; i < allOptions; i++) {
            if (option_list.children[i].textContent === correctAns) {
                option_list.children[i].classList.add("correct");
                option_list.children[i].insertAdjacentHTML("beforeend", '<div class="icon tick"><i class="fa-solid fa-check"></i></div>');
            }
        }
    }
    
    // Disable all options once one is selected
    for (let i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled");
    }
    
    // Track the selected option to ensure uniqueness
    selectedOptions.push(userAns);
    
    // Automatically go to the next question after a delay
    setTimeout(() => {
        que_count++;
        if (que_count < questions.length) {
            showQuestion(que_count);
            queCounter(que_count + 1); 
            // Remove previous selected option from available options
            const allOptions = option_list.children;
            for (let i = 0; i < allOptions.length; i++) {
                allOptions[i].classList.remove("disabled");
                if (selectedOptions.includes(allOptions[i].textContent)) {
                    allOptions[i].classList.add("disabled");
                }
            }
        } else {
            showResultBox();
            changeText();
        }
    }, 1000); // (e.g., 1000ms = 1s)
}

function showResultBox() {
    info_box.classList.remove("activeInfo");
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.add("activeResult");

    // Show YouTube link if score is less than number of questions
    const youtubeLinkContainer = document.getElementById("youtubeLinkContainer");
    const youtubeVideo = document.getElementById("youtube_video");

    if (userScore < questions.length) {
        youtubeLinkContainer.innerHTML = `<p>Watch this video for more information:</p><a href="https://www.youtube.com/watch?v=yjLB_ntM324" target="_blank">Click here to watch</a>`;
    } else {
        youtubeLinkContainer.innerHTML = ''; // Clear the link if score is not less
    }
}




function changeText() {
    const scoreText = result_box.querySelector(".score_text");
    let scoreTag = `<span>and sorry, ${username} you got only <p>${userScore}</p> out of <p>${questions.length}</p></span>`;
    scoreText.innerHTML = scoreTag;
}

function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        timeCount.textContent = time;
        time--;
        if (time < 9) {
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if (time < 0) {
            clearInterval(counter);
            timeCount.textContent = "00";
            timeOff.textContent = "Time Off";
            let allOptions = option_list.children.length;
            for (let i = 0; i < allOptions; i++) {
                if (option_list.children[i].textContent === correctAns) {
                    option_list.children[i].classList.add("correct");
                    option_list.children[i].insertAdjacentHTML("beforeend", '<div class="icon tick"><i class="fa-solid fa-check"></i></div>');
                }
            }
            for (let i = 0; i < allOptions; i++) {
                option_list.children[i].classList.add("disabled");
            }
            setTimeout(() => {
                que_count++;
                if (que_count < questions.length) {
                    showQuestion(que_count);
                    queCounter(que_count + 1);
                    startTimer(timerValue);  
                    startTimerLine(0);     
                } else {
                    showResultBox();
                    changeText();
                }
            }, 1000);
        }
    }
}

function startTimerLine(time) {
    counterLine = setInterval(timer, 30);
    function timer() {
        time += 1;
        timeLine.style.width = time + "px";
        if (time > 549) {
            clearInterval(counterLine);
        }
    }
}

function queCounter(index) {
    const pointCounter = quiz_box.querySelector(".points .point_no");
    pointCounter.textContent = index + 1;
}
