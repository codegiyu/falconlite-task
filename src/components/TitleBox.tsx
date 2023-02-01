import classes from "../styles/TitleBoxStyle.module.scss";

export interface TitleProps {
    title: string;
    text: string;
}

interface Props {
    titleProps: TitleProps
}

const TitleBox: React.FC<Props> = (props) => {
    let {title, text} = props.titleProps

    return (
        <div className={classes.title_box}>
            <h1>{ title }</h1>
            <p>{ text }</p>
        </div>
    )
}

export default TitleBox