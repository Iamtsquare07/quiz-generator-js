const loadQuiz = document.getElementById('load-quiz');
const create = document.getElementById('create-quiz');
const quizContainer = document.getElementById('quiz-container');
const quizForm = document.getElementById('create-quiz-form');


loadQuiz.addEventListener('click', () => {
    fetch('/quiz')  // Request a quiz from the server
        .then(response => response.json())
        .then(data => displayQuiz(data));
});

function displayQuiz(quizData) {
    quizContainer.innerHTML = '';
    const quizTitle = document.createElement('h2');
    quizTitle.textContent = quizData.title;
    quizContainer.appendChild(quizTitle);

    quizData.questions.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.innerHTML = `<p>Question ${index + 1}: ${question.question}</p>`;
        question.options.forEach((option, optionIndex) => {
            const label = document.createElement('label');
            label.innerHTML = `<input type="radio" name="q${index}" value="${option}">${option}`;
            questionDiv.appendChild(label);
        });
        quizContainer.appendChild(questionDiv);
    });
}

function createQuiz() {
    create.classList.add('active')
    quizForm.style.display = 'block';
}

create.addEventListener('click', createQuiz)
// Initialize counters for questions and options
let questionCounter = 1;

// Function to add a new question
function addQuestion() {
    const quizForm = document.getElementById('quiz-body');
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('quiz-question');
    questionCounter++; // Increment question counter

    questionDiv.innerHTML = `
    <div class="quiz-items">
        <input id="question-${questionCounter}" type="text" placeholder="Question ${questionCounter}">
        <div class="answer">
            <input type="text" id="option-${questionCounter}-1" placeholder="Option">
            <input type="checkbox" id="answer-indicator-${questionCounter}-1">
        </div>
        <div class="answer">
            <input type="text" id="option-${questionCounter}-1" placeholder="Option">
            <input type="checkbox" id="answer-indicator-${questionCounter}-1">
        </div>
        <div class="answer">
            <input type="text" id="option-${questionCounter}-1" placeholder="Option">
            <input type="checkbox" id="answer-indicator-${questionCounter}-1">
        </div>
        <div class="answer">
            <input type="text" id="option-${questionCounter}-1" placeholder="Option">
            <input type="checkbox" id="answer-indicator-${questionCounter}-1">
        </div>
        <button class="add-option" data-question="${questionCounter}">Add new answer</button>
    </div>
`;

    // Add an event listener to the new "Add Question" button
    const addQuestionButton = questionDiv.querySelector('.add-option');
    addQuestionButton.addEventListener('click', addAnswer);

    quizForm.appendChild(questionDiv);
}

// Function to add a new answer for a question
function addAnswer(event) {
    const questionNumber = event.target.dataset.question;
    const answerDiv = document.querySelector(`#question-${questionNumber} .answer`);
    const answerCounter = answerDiv.querySelectorAll('input[type="text"]').length / 2 + 1; // Count existing answers

    const answerInput = document.createElement('input');
    answerInput.type = 'text';
    answerInput.id = `option-${questionNumber}-${answerCounter}`;
    answerInput.placeholder = 'Option';

    const answerRadio = document.createElement('input');
    answerRadio.type = 'radio';
    answerRadio.id = `answer-indicator-${questionNumber}-${answerCounter}`;

    answerDiv.appendChild(answerInput);
    answerDiv.appendChild(answerRadio);
}

// Add an event listener to the initial "Add Question" button
const initialAddQuestionButton = document.querySelector('.add-question');
initialAddQuestionButton.addEventListener('click', addQuestion);

// Add an event listener to the initial "Add Answer" button
const initialAddAnswerButton = document.querySelector('.add-option');
initialAddAnswerButton.addEventListener('click', addAnswer);
