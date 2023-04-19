import { ThemeContext } from "../contexts/ThemeContext";
import { useContext } from "react"; 

const NavBar = () => {
    const { isLight, light, dark } = useContext(ThemeContext);
    const theme = isLight ? light : dark;
    return (
        <nav style={{ background: theme.ui, color: theme.text }}>
        <h2>Navigation</h2>
        <ul className='header'>
            <li><a>Home</a></li>
            <li><a>About</a></li>
            <li><a>Contact</a></li>
        </ul>
        </nav>
    );
    };

export default NavBar;
