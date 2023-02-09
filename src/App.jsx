import { useEffect, useState } from "react";
import Toggle from "react-toggle";
import "./assets/react-toggle.css";
import { Icon } from "@iconify/react";
import Intro from "./components/Intro.jsx";
import Quiz from "./components/Quiz.jsx";
import "./App.scss";

function App() {
    const [theme, setTheme] = useState("dark");
    const [quizIsFinished, setQuizIsFinished] = useState(false);

    function resetQuiz(resetLocalState) {
        setQuizIsFinished(false);
        resetLocalState();
    }

    function checkAnswers() {
        setQuizIsFinished(true);
    }

    const triviaUrl =
        "https://opentdb.com/api.php?amount=50&category=9&type=multiple";
    const [questionBank, setQuestionBank] = useState([]);

    useEffect(() => {
        (async () => {
            const resp = await fetch(triviaUrl);
            const data = await resp.json();
            setQuestionBank(data.results);
        })();
    }, []);

    function toggleTheme() {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    }

    return (
        <div className={`App ${theme}`}>
            <Toggle
                onClick={toggleTheme}
                icons={{
                    checked: (
                        <Icon icon='material-symbols:light-mode-outline' />
                    ),
                    unchecked: (
                        <Icon icon='material-symbols:dark-mode-outline' />
                    ),
                }}
            />
            <Intro />
            {questionBank.length === 0 ? (
                <Loading />
            ) : (
                <Quiz
                    questionBank={questionBank.slice(0, 5)}
                    quizIsFinished={quizIsFinished}
                    resetQuiz={resetQuiz}
                    checkAnswers={checkAnswers}
                />
            )}
        </div>
    );
}

function Loading() {
    return <div className='loading-screen'>Loading...</div>;
}

export default App;
