import classes from "../styles/ImgSectionStyle.module.scss";
import hero from "../images/hero.png";

const ImgSection: React.FC = () => {
    return (
        <div className={classes.img_container}>
            <img src={ hero } alt="A sample of transactions on a purple background" />
        </div>
    )
}

export default ImgSection