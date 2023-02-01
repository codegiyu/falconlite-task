import classes from "../styles/EmailVerificationStyle.module.scss";
import AuthLayout from "../layout/AuthLayout";
import ErrorBoundary from "../components/ErrorBoundary";
import TitleBox from "../components/TitleBox";
import VerificationInput from "../components/VerificationInput";
import Button from "../components/Button";
import { ButtonProps } from "../components/Button";
import { TitleProps } from "../components/TitleBox";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { VerificationInputProps, VerificationInputValues } from "../components/VerificationInput";
import useAlertStore, { AlertObj } from "../store/zustand/alertStore";
import { useNavigate } from "react-router-dom";
import SEO, { SEOProps } from "../components/SEO";

interface VerificationInputValueState extends VerificationInputValues {
    total: () => string;
}

const defaultVerificationValues: VerificationInputValueState = {
    one: "",
    two: "",
    three: "",
    four: "",
    five: "",
    total: function() {
        return this.one + this.two + this.three + this.four + this.five
    }
}

interface Data {
    message: string;
    email?: string;
    "verification_code"?: string;
}

export interface ResponseDataObject {
    success: boolean;
    code: number;
    data: Data;
}

const EmailVerification: React.FC = () => {

    const setAlert = useAlertStore(state => state.setAlert)

    const navigate = useNavigate()

    let [disabled, setDisabled] = useState<boolean>(false)
    let [loading, setLoading] = useState<boolean>(false)
    let [value, setValue] = useState<VerificationInputValueState>(defaultVerificationValues)

    let inputOneRef: React.MutableRefObject<null | HTMLInputElement> = useRef(null)
    let inputTwoRef: React.MutableRefObject<null | HTMLInputElement> = useRef(null)
    let inputThreeRef: React.MutableRefObject<null | HTMLInputElement> = useRef(null)
    let inputFourRef: React.MutableRefObject<null | HTMLInputElement> = useRef(null)
    let inputFiveRef: React.MutableRefObject<null | HTMLInputElement> = useRef(null)

    const handleBoxFocus = useCallback(() => {
        let firstEmptyBox: string | undefined;
        let valuesArr = Object.entries(value)
        
        for (let i = 0; i < valuesArr.length; i++) {
            if (!valuesArr[i][1]) {
                firstEmptyBox = valuesArr[i][0]
                break;
            }
        }

        switch (firstEmptyBox) {
            case "one":
                inputOneRef.current?.focus()
                break;
            case "two":
                inputTwoRef.current?.focus()
                break;
            case "three":
                inputThreeRef.current?.focus()
                break;
            case "four":
                inputFourRef.current?.focus()
                break;
            case "five":
                inputFiveRef.current?.focus()
                break;
            default:
                inputFiveRef.current?.focus()
                break;
        }
    }, [value])

    const handleBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let name = e.target.name;
        e.target.value = e.target.value.slice(-1)
        
        setValue({...value, [name]: e.target.value})

        switch (name) {
            case "one":
                inputTwoRef.current?.focus()
                break;
            case "two":
                inputThreeRef.current?.focus()
                break;
            case "three":
                inputFourRef.current?.focus()
                break;
            case "four":
                inputFiveRef.current?.focus()
                break;
            default:
                break;
        }

        const handleBackspace = (e: KeyboardEvent) => {
            if (e.key === "Backspace") {
                
                if (name === "five") {
                    setValue({...value, four: ""})
                } else if (name === "four") {
                    setValue({...value, three: ""})
                } else if (name === "three") {
                    setValue({...value, two: ""})
                } else if (name === "two") {
                    setValue({...value, one: ""})
                }
            }
        }

        e.target.addEventListener("keydown", handleBackspace)
    }

    useEffect(() => {
        handleBoxFocus()
        
        if (value.total().length === 5) setDisabled(false)
        else setDisabled(true)
    }, [value, handleBoxFocus])

    const handleFormSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setDisabled(true)
        setLoading(true)

        let payload = `code=${value.total()}`
        console.log(payload)
        try {
            const response = await fetch("https://falconlite.com/v1/api/verify-email",{
                method: "POST",
                body: payload,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })

            if (response) {
                const dataString = await response.text()
                const data: ResponseDataObject = JSON.parse(dataString)        
                console.log(data)
                if (data.success) {
                    const alertProps: AlertObj = {
                        message: data.data.message,
                        type: "success"
                    }
                    setAlert(alertProps)
                    navigate("/success", {replace: true})
                    setLoading(false)
                } else {
                    throw new Error(data.data.message)
                }
            } else throw new Error("Request failed!")

        } catch (error: any) {
            const alertProps: AlertObj = {
                message: error.message,
                type: "error"
            }
            setAlert(alertProps)
            setLoading(false)
        }
    } 

    const titleBoxProps: TitleProps = {
        title: "Kindly enter email verification code",
        text: "To Sign up, kindly enter the verification code sent to your email address"
    }

    let inputProps: VerificationInputProps = {
        value, 
        handleBoxFocus, 
        handleBoxChange,
        refs: {
            one: inputOneRef,
            two: inputTwoRef,
            three: inputThreeRef,
            four: inputFourRef,
            five: inputFiveRef,
        }
    }

    const btnProps: ButtonProps = {
        type: "submit",
        text: loading ? "Verifying..." : "Proceed",
        disabled,
        handleFormSubmit
    }

    const seoObj: SEOProps = {
        title: "Email Verification - FalconLite Inc",
        desc: "Falconlite is platform that allows users to make cross border transactions. Our platform enables users to send, receive and transact globally."
    }

    return (
        <AuthLayout>
            <SEO seoProps={seoObj} />
            <section className={classes.title_section}>
                <ErrorBoundary>
                    <TitleBox titleProps={titleBoxProps} />
                </ErrorBoundary>
            </section>
            <section className={classes.form_section}>
                <form method="POST">
                    <div className={classes.inputs_wrap}>
                        <ErrorBoundary>
                            <VerificationInput verificationProps={inputProps} />
                        </ErrorBoundary>
                    </div>
                    <div className={classes.button_wrap}>
                        <Button buttonProps={btnProps} />
                    </div>
                </form>
            </section>
        </AuthLayout>
    )
}

export default EmailVerification