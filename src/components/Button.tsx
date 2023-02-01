import classes from "../styles/ButtonStyle.module.scss";

export interface ButtonProps {
    type: "button" | "submit" | "reset" | undefined;
    text: string;
    disabled: boolean;
    handleFormSubmit?: (e: React.FormEvent<HTMLButtonElement>) => void;
    handleClick?: () => void | undefined;
}

interface Props {
    buttonProps: ButtonProps
}

const Button: React.FC<Props> = (props) => {
    let {
            type, 
            text, 
            disabled, 
            handleFormSubmit, 
            handleClick
        } = props.buttonProps

    return (
        <button
            type={ type }
            disabled={ disabled }
            onClick={type === "submit" ? handleFormSubmit : handleClick}
            className={classes.button}
        >
            { text }
        </button>
    )
}

export default Button