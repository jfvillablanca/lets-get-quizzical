import { useEffect, useState } from "react";
import Toggle from "react-toggle";
import "./assets/react-toggle.css";
import { Icon } from "@iconify/react";
import Intro from "./components/Intro.jsx";
import Quiz from "./components/Quiz.jsx";
import "./App.scss";

function App() {
    const quizLength = 5;
    const triviaUrl = `https://opentdb.com/api.php?amount=${quizLength}&category=9&type=multiple`;

    const [theme, setTheme] = useState("dark");
    const [quizIsFinished, setQuizIsFinished] = useState(false);
    const [startQuiz, setStartQuiz] = useState(false);

    function handleIntroClick() {
        setStartQuiz(true);
    }

    function resetQuiz(resetLocalState) {
        setQuizIsFinished(false);
        resetLocalState();
    }

    function checkAnswers() {
        setQuizIsFinished(true);
    }

    const [questionBank, setQuestionBank] = useState([]);

    useEffect(() => {
        // BUG: Initial Render: Two API calls instead of just one
        (async () => {
            const resp = await fetch(triviaUrl);
            const data = await resp.json();
            setQuestionBank(data.results);
        })();
        // NOTE:: Also two API calls, most likely unrelated to the bug.
        // - `quizIsFinished` flips value twice, on checkAnswers and on resetQuiz
    }, [quizIsFinished]);

    function toggleTheme() {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    }

    return (
        <div className={`App ${theme}`}>
            <Blob />
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
            {!startQuiz ? (
                <Intro handleIntroClick={handleIntroClick} />
            ) : questionBank.length === 0 ? (
                <Loading />
            ) : (
                <Quiz
                    questionBank={questionBank}
                    quizIsFinished={quizIsFinished}
                    resetQuiz={resetQuiz}
                    checkAnswers={checkAnswers}
                    quizLength={quizLength}
                />
            )}
        </div>
    );
}

function Loading() {
    return <div className='loading-screen'>Loading...</div>;
}

function Blob() {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        function handleScroll() {
            setScrollY(self.pageYOffset);
        }

        self.addEventListener("scroll", handleScroll);

        return () => {
            self.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const maxTranslateY = self.innerHeight * 0.7;
    const translate = `translateY(${Math.min(scrollY * 0.5, maxTranslateY)}px)`;

    return (
        <div
            className='blob'
            style={{
                transform: translate,
            }}
        />
    );
}

export default App;
