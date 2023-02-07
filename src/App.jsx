import { useState } from "react";
import "./App.scss";
import Toggle from "react-toggle";
import "./assets/react-toggle.css";
import { Icon } from "@iconify/react";
import Intro from "./components/Intro.jsx";

function App() {
    const [theme, setTheme] = useState("dark");

    function toggleTheme() {
        console.log(theme);
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    }

    return (
        <div className={`App ${theme}`}>
            <Toggle
                onClick={toggleTheme}
                className='theme-toggle'
                icons={{
                    checked: (
                        <Icon icon='material-symbols:light-mode-outline' />
                    ),
                    unchecked: (
                        <Icon icon='material-symbols:dark-mode-outline' />
                    ),
                }}
            />
        </div>
    );
}

export default App;
