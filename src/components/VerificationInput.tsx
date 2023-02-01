import classes from "../styles/VerificationInputStyle.module.scss";

export interface VerificationInputValues {
    "one": string;
    "two": string;
    "three": string;
    "four": string;
    "five": string;
}

export interface Refs {
    "one": React.MutableRefObject<null | HTMLInputElement>;
    "two": React.MutableRefObject<null | HTMLInputElement>;
    "three": React.MutableRefObject<null | HTMLInputElement>;
    "four": React.MutableRefObject<null | HTMLInputElement>;
    "five": React.MutableRefObject<null | HTMLInputElement>;
}

export interface VerificationInputProps {
    value: VerificationInputValues; 
    handleBoxFocus: () => void;
    handleBoxChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
    refs: Refs;
}

interface Props {
    verificationProps: VerificationInputProps
}

const VerificationInput: React.FC<Props> = (props) => {
    let {value, handleBoxFocus, handleBoxChange, refs} = props.verificationProps

    return (
        <div className={classes.verification_box_wrap}>
            <input 
                type="text" 
                name="one" 
                value={value.one} 
                onClick={handleBoxFocus} 
                onChange={handleBoxChange}
                ref={refs.one}
                maxLength={1}
            />
            <input 
                type="text" 
                name="two" 
                value={value.two} 
                onClick={handleBoxFocus} 
                onChange={handleBoxChange}
                ref={refs.two}
                maxLength={1}
            />
            <input 
                type="text" 
                name="three" 
                value={value.three} 
                onClick={handleBoxFocus} 
                onChange={handleBoxChange}
                ref={refs.three}
                maxLength={1}
            />
            <input 
                type="text" 
                name="four" 
                value={value.four} 
                onClick={handleBoxFocus} 
                onChange={handleBoxChange}
                ref={refs.four}
                maxLength={1}
            />
            <input 
                type="text" 
                name="five" 
                value={value.five} 
                onClick={handleBoxFocus} 
                onChange={handleBoxChange}
                ref={refs.five}
                maxLength={1}
            />
        </div>
    )
}

export default VerificationInput