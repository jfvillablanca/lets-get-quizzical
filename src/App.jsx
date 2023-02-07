import "./App.scss";
import Toggle from "react-toggle";
import "./assets/react-toggle.css";
import { Icon } from "@iconify/react";
import Intro from "./components/Intro.jsx";

function App() {
    const [theme, setTheme] = useState("dark");

    return (
        <div className={`App ${theme}`}>
            <Toggle
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
