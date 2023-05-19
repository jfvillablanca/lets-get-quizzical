export default function Intro({
    handleIntroClick,
    handleCategoryChange,
    selectedCategory,
}) {
    return (
        <div className='intro'>
            <h1>🤓 Let's get quizzical! 💭</h1>
            <div className='category'>
                <label
                    className={
                        "category-questions" +
                        (selectedCategory.quizLength === 5 ? " active" : "")
                    }
                >
                    <input
                        type='radio'
                        name='question-qty'
                        value='5'
                        onChange={handleCategoryChange}
                    />
                    5 questions
                </label>
                <label
                    className={
                        "category-questions" +
                        (selectedCategory.quizLength === 10 ? " active" : "")
                    }
                >
                    <input
                        type='radio'
                        name='question-qty'
                        value='10'
                        onChange={handleCategoryChange}
                    />
                    10 questions
                </label>
                <label
                    className={
                        "category-questions" +
                        (selectedCategory.quizLength === 15 ? " active" : "")
                    }
                >
                    <input
                        type='radio'
                        name='question-qty'
                        value='15'
                        onChange={handleCategoryChange}
                    />
                    15 questions
                </label>
            </div>
            <button onClick={handleIntroClick}>
                {!selectedCategory
                    ? "Select no. of questions"
                    : "Start the quiz!"}
            </button>
        </div>
    );
}
