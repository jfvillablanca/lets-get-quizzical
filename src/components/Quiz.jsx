import { useState } from "react";
import { nanoid } from "nanoid";
import { decode } from "he";
import data from "../assets/questions.js";

function shuffleArray(array) {
    return array.slice().sort(() => Math.random() - 0.5);
}

export default function Quiz() {
    const [quizzes, setQuizzes] = useState(getQuestions());
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [answeredAll, setAnsweredAll] = useState(false);

    function handleSelect(questionIndex, answerIndex) {
        console.log(questionIndex, answerIndex);
        setSelectedAnswers({
            ...selectedAnswers,
            [questionIndex]: answerIndex,
        });
        setAnsweredAll(
            // HACK: +1 is caused by an off-by-one bug. Since
            // selectedAnswers gets updated on the next render,
            // the length update would happen in the future,
            // not now when it's needed lol. Thus: "+1"
            () => Object.keys(selectedAnswers).length + 1 === quizzes.length
        );
    }

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
                    questionNum={index + 1}
                    question={quiz.question}
                    choices={quiz.choices}
                    selectedAnswer={selectedAnswers[index]}
                    handleSelect={(answerIndex) =>
                        handleSelect(index, answerIndex)
                    }
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

function Question({
    question,
    choices,
    id,
    questionNum,
    selectedAnswer,
    handleSelect,
}) {
    function printQuizChoice() {
        return choices.map((option, i) => {
            const classSelect =
                (selectedAnswer === i ? "selected " : "") + `quiz-choice-${i}`;
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
                Question {questionNum}: {question}
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
