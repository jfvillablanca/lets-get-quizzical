import data from "../assets/questions.js";

export default function Quiz() {
    function getQuestions() {
        return data.map(({ question, correct_answer, incorrect_answers }) => {
            return {
                question,
                choices: [
                    {
                        choice: correct_answer,
                        isCorrect: true,
                    },
                    ...incorrect_answers.map((answer) => ({
                        choice: answer,
                        isCorrect: false,
                    })),
                ],
            };
        });
    }

    return (
        <div className='quiz'>
            <Question />
        </div>
    );
}

function Question({ question, choices }) {
    return (
        <section className='quiz-question'>
            <h1>{question}</h1>
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
