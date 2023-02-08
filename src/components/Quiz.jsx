import { useState } from "react";
import { nanoid } from "nanoid";
import { decode } from "he";
import data from "../assets/questions.js";

export default function Quiz() {
    const [quizzes, setQuizzes] = useState(getQuestions());

    function getQuestions() {
        return data.map(({ question, correct_answer, incorrect_answers }) => {
            return {
                id: nanoid(),
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
        return quizzes.map((quiz, index) => {
            return (
                <Question
                    key={quiz.id}
                    id={quiz.id}
                    index={index + 1}
                    question={quiz.question}
                    choices={quiz.choices}
                />
            );
        });
    }

    return (
        <div className='quiz'>
            {printQuestions()}
            <SubmitButton />
        </div>
    );
}

function Question({ question, choices, id, index }) {
    const [selected, setSelected] = useState(null);

    function handleSelect(index) {
        setSelected(index);
    }

    function printQuizChoice() {
        return choices.map((option, i) => {
            const classSelect =
                (selected === i ? "selected " : "") + `quiz-choice-${i}`;
            return (
                <button
                    className={classSelect}
                    id={`${i}-${id}`}
                    key={`${i}-${id}`}
                    onClick={() => handleSelect(i)}
                >
                    {option.choice}
                </button>
            );
        });
    }

    return (
        <section>
            <h1 className='quiz-question'>
                Question {index}: {question}
            </h1>
            <div className='quiz-choices'>
                {printQuizChoice()}
            </div>
        </section>
    );
}

function SubmitButton() {
    return <button className='check-answers'>Check Answers</button>;
}
