import { useState } from "react";
import classes from "../styles/InputStyle.module.scss";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

export interface InputProps {
    type?: string;
    name: string; 
    label: string; 
    placeholder: string;
    required?: boolean;
    passwordVisibilityToggle?: boolean;
    inputValue: string;
    hasError: boolean;
    errorValue: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}

interface Props {
    inputProps: InputProps
}

const Input: React.FC<Props> = (props) => {
    let {
        type = "text",
        name, 
        label, 
        placeholder, 
        required = true,
        passwordVisibilityToggle = false,
        inputValue,
        hasError,
        errorValue,
        handleChange,
        handleBlur
    } = props.inputProps;

    let [passwordIsVisible, setPasswordIsVisible] = useState<boolean>(false);

    if (passwordVisibilityToggle) {
        type = passwordIsVisible ? "text" : "password"
    }

    const handlePasswordVisibility = () => {
        setPasswordIsVisible(!passwordIsVisible)
    }

    return (
        <div className={classes.control_wrap}>
            <div className={classes.input_wrap}>
                <label>
                    <span>{ label }</span>
                    <input 
                        type={ type } 
                        name={ name } 
                        value={inputValue} 
                        onChange={ handleChange } 
                        onBlur={handleBlur}
                        placeholder={ placeholder } 
                        required={ required }
                        data-visibility={passwordVisibilityToggle}
                        className={`${hasError ? classes.error : ""}`}
                    />
                </label>
                {passwordVisibilityToggle && 
                    <div 
                        onClick={ handlePasswordVisibility }
                        className={classes.password_toggler_box} 
                        tabIndex={1}
                    >
                        {passwordIsVisible 
                            ? <BsEyeSlashFill className={classes.eye_icon} />
                            : <BsEyeFill className={classes.eye_icon} />
                        }
                    </div>        
                }
                {hasError 
                ?   (<div className={classes.error_text_wrap}>
                        <p>
                            { errorValue }
                        </p> 
                    </div>)
                :   null
                }
            </div>
            
        </div>
    )
}

export default Input