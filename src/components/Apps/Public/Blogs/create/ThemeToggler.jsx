import DarkTheme from "../../../../../images/DarkTheme";
import LightTheme from "../../../../../images/LightTheme";

export default function ThemeToggler({ theme, setTheme }) {
    function toggle() {
        if (theme === 'light') {
            setTheme('dark');
            localStorage.setItem('editor-theme', 'dark')
        } else {
            setTheme('light');
            localStorage.setItem('editor-theme', 'light')
        }
    }
    return (
        <div style={{ width: '24px', color: theme === 'light' ? 'black' : 'white' }} onClick={toggle} >
            {
                theme === 'light' ?
                    <>
                        <DarkTheme />
                    </>
                    :
                    <>
                        <LightTheme />
                    </>
            }
        </div >
    )
}
