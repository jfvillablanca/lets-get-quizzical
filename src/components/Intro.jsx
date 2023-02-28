export default function Intro({
    handleIntroClick,
    handleCategoryChange,
    selectedCategory,
}) {
    return (
        <div className='intro'>
            <h1>💭😩 Quiz Me Daddy 🥴💦</h1>
            <div className='category'>
                <label
                    className={
                        "category-questions" +
                        (selectedCategory === "5 questions" ? " active" : "")
                    }
                >
                    <input
                        type='radio'
                        name='question-qty'
                        value='5 questions'
                        onChange={handleCategoryChange}
                    />
                    5 questions
                </label>
                <label
                    className={
                        "category-questions" +
                        (selectedCategory === "10 questions" ? " active" : "")
                    }
                >
                    <input
                        type='radio'
                        name='question-qty'
                        value='10 questions'
                        onChange={handleCategoryChange}
                    />
                    10 questions
                </label>
                <label
                    className={
                        "category-questions" +
                        (selectedCategory === "15 questions" ? " active" : "")
                    }
                >
                    <input
                        type='radio'
                        name='question-qty'
                        value='15 questions'
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
