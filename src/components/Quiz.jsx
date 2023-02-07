import { useState } from "react";
import { nanoid } from "nanoid";
import { decode } from "he";
import data from "../assets/questions.js";

export default function Quiz() {
    const [quizzes, setQuizzes] = useState(getQuestions());

    function getQuestions() {
        return data.map(({ question, correct_answer, incorrect_answers }) => {
            return {
                question: decode(question),
                choices: [
                    {
                        choice: decode(correct_answer),
                        isCorrect: true,
                    },
                    ...incorrect_answers.map((answer) => ({
                        choice: decode(answer),
                        isCorrect: false,
                    })),
                ],
            };
        });
    }

    function printQuestions() {
        return quizzes.map((quiz) => {
            return (
                <Question
                    key={nanoid()}
                    question={quiz.question}
                    choices={quiz.choices}
                />
            );
        });
    }

    return (
        <div className='quiz'>
            <Question />
            {printQuestions()}
        </div>
    );
}

function Question({ question, choices }) {
    return (
        <section>
            <h1 className='quiz-question'>{question}</h1>
            <div className='quiz-choices'>
                <button className='quiz-choice-1'>{choices[0].choice}</button>
                <button className='quiz-choice-1'>{choices[1].choice}</button>
                <button className='quiz-choice-1'>{choices[2].choice}</button>
                <button className='quiz-choice-1'>{choices[3].choice}</button>
            </div>
            <hr />
        </section>
    );
}
