import classes from "../styles/HeaderStyle.module.scss";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
    return (
        <header className={classes.header}>
            <Link to="/" className={classes.logoLink}>
                <img src={ logo } alt="FalconLite logo" />
            </Link>
        </header>
    )
}

export default Header