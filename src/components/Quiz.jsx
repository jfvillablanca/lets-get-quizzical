export default function Quiz() {
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
