const express = require('express');
const app = express();

const quizzes = [
    {
        title: 'Math Quiz',
        questions: [
            {
                question: 'What is the value of pi (π)?',
                options: ['4.66920', '3.14159', '1.61803', '2.71828'],
                answer: '3.14159',
            },
            {
                question: 'What is 3 * 7?',
                options: ['14', '21', '28', '35'],
                answer: '21',
            },
        ],
    },
    // Add more quizzes here
];

app.use(express.static('./'));

app.get('/quiz', (req, res) => {
    const randomQuiz = quizzes[Math.floor(Math.random() * quizzes.length)];
    res.json(randomQuiz);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
