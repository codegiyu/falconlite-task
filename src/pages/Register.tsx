import React, { useState } from "react";
import classes from "../styles/RegisterStyle.module.scss";
import AuthLayout from "../layout/AuthLayout";
import ErrorBoundary from "../components/ErrorBoundary";
import TitleBox from "../components/TitleBox";
import Input from "../components/Input";
import Button from "../components/Button";
import { BsCheckLg } from "react-icons/bs";
import { InputProps } from "../components/Input";
import { ButtonProps } from "../components/Button";
import { TitleProps } from "../components/TitleBox";
import { Link, useNavigate } from "react-router-dom";
import { ResponseDataObject } from "./EmailVerification";
import useAlertStore, { AlertObj } from "../store/zustand/alertStore";
import SEO, { SEOProps } from "../components/SEO";

interface InputValues {
    name: string;
    email: string;
    phone: string;
    password: string;
}

const defaultValues: InputValues = {
    name: "",
    email: "",
    phone: "",
    password: ""
}

interface HasErrors {
    name: boolean;
    email: boolean;
    phone: boolean;
    password: boolean;
}

const defaultHasErrors: HasErrors = {
    name: false,
    email: false,
    phone: false,
    password: false
}

const Register: React.FC = () => {

    const navigate = useNavigate()

    const setAlert = useAlertStore(state => state.setAlert)

    let [values, setValues] = useState<InputValues>(defaultValues)
    let [disabled, setDisabled] = useState<boolean>(false)
    let [hasErrors, setHasErrors] = useState<HasErrors>(defaultHasErrors)
    let [errorValues, setErrorValues] = useState<InputValues>(defaultValues)
    let [rememberChecked, setRememberChecked] = useState<boolean>(false)
    let [loading, setLoading] = useState<boolean>(false)

    const handleCheckboxChange = () => {
        setRememberChecked(prevState => !prevState)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let inputName = e.target.name

        setValues(prevState => {
            return { ...prevState, [inputName]: e.target.value }
        })

        setHasErrors(prevState => {
            return { ...prevState, [inputName]: false }
        })

        setErrorValues(prevState => {
            return { ...prevState, [inputName]: "" }
        })
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        let name = e.target.name, type = e.target.type,
        passwordVisibilityToggle = e.target.dataset.visibility        
        try {
            if (e.target.value) {
                if (type === "password" || passwordVisibilityToggle === "true") {
                    if (!/^(?=.*[A-Z])(?=.*[0-9@$!%*#?&()[\]{}\-_.,:;^=+])[a-zA-Z0-9@$!%*#?&()[\]{}\-_.,:;^=+]{8,}$/
                    .test(e.target.value)) {
                        throw new Error("Password issues")
                    }
                } else if (type === "email") {
                    if (!/(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@[*[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+]*/.test(e.target.value)) throw new Error("Email address format is invalid")
                } else if (type === "text" && name.includes("name")) {
                    if (!/^[a-zA-Z- ]{3,}$/i.test(e.target.value)) throw new Error("Name issues")
                } else if (name.includes("phone")) {
                    if (!/^(\+\d{13}|\d{11})$/.test(e.target.value)) throw new Error("Phone number format is invalid")
                }
            }
        } catch (err: any) {
            setHasErrors({ ...hasErrors, [name]: true })            
            if (err.message === "Password issues"){
                if (!/^(?=.*[A-Z])[a-zA-Z0-9@$!%*#?&()[\]{}\-_.,:;^=+]*$/.test(e.target.value)) {
                    setErrorValues({ ...errorValues, [name]: "Add uppercase letters to your password" })
                } else if (!/^(?=.*[0-9@$!%*#?&()[\]{}\-_.,:;^=+])[a-zA-Z0-9@$!%*#?&()[\]{}\-_.,:;^=+]*$/.test(e.target.value)) {
                    setErrorValues({ ...errorValues, [name]: "Add numbers/symbols letters to your password" })
                } else {
                    setErrorValues({ ...errorValues, [name]: "Your password should be at least 8 characters" })
                }
            } else if (err.message === "Name issues") {
                if (e.target.value.length < 3) {
                    setErrorValues({ ...errorValues, [name]: "Name cannot be less than 3 characters" })
                } else {
                    setErrorValues({ ...errorValues, [name]: "This field can only contain A to Z and -" })
                }
            } else {
                setErrorValues({ ...errorValues, [name]: err.message })
            } 
        }
    }

    const handleFormSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setDisabled(true)
        setLoading(true)

        const fieldsAreErrorFree = () => {
            return Object.values(hasErrors).every(value => value === false)
        }

        const fieldsAreNotEmpty = () => {
            return Object.values(values).every(value => value !== "")
        }

        if (fieldsAreErrorFree() && fieldsAreNotEmpty()) {
            let payload = `name=${values.name}&email=${values.email}&phone=${values.phone}&password=${values.password}`
    
            try {
                const response = await fetch("https://falconlite.com/v1/api/send-email",{
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
                        navigate(`/email-verification`, {replace: true})
                        setDisabled(false)
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
                setDisabled(false)
                setLoading(false)
            }
        } else {
            const alertProps: AlertObj = {
                message: "Resolve input fields that are empty or have errors first!",
                type: "error"
            }
            setAlert(alertProps)
            setDisabled(false)
            setLoading(false)
        }
    }

    const titleBoxProps: TitleProps = {
        title: "Create an account",
        text: "Register on our website with your correct email address and information"
    }

    const nameInputProps: InputProps = {
        name: "name", 
        label: "First Name", 
        placeholder: "Jeremiah", 
        inputValue: values.name,
        hasError: hasErrors.name,
        errorValue: errorValues.name,
        handleChange,
        handleBlur
    }

    const emailInputProps: InputProps = {
        type: "email",
        name: "email", 
        label: "Email Address", 
        placeholder: "Fame@gmail.com", 
        inputValue: values.email,
        hasError: hasErrors.email,
        errorValue: errorValues.email,
        handleChange,
        handleBlur
    }

    const phoneInputProps: InputProps = {
        type: "tel",
        name: "phone", 
        label: "Phone Number", 
        placeholder: "+23481037690", 
        inputValue: values.phone,
        hasError: hasErrors.phone,
        errorValue: errorValues.phone,
        handleChange,
        handleBlur
    }

    const passwordInputProps: InputProps = {
        type: "password",
        name: "password", 
        label: "Password", 
        placeholder: "Password1234", 
        passwordVisibilityToggle: true,
        inputValue: values.password,
        hasError: hasErrors.password,
        errorValue: errorValues.password,
        handleChange,
        handleBlur
    }

    const btnProps: ButtonProps = {
        type: "submit",
        text: loading ? "Signing up..." : "Sign up",
        disabled,
        handleFormSubmit
    }

    const seoObj: SEOProps = {
        title: "Register - FalconLite Inc",
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
                    <fieldset>
                        <ErrorBoundary>
                            <Input inputProps={nameInputProps} />
                        </ErrorBoundary>
                        <ErrorBoundary>
                            <Input inputProps={emailInputProps} />
                        </ErrorBoundary>
                        <ErrorBoundary>
                            <Input inputProps={phoneInputProps} />
                        </ErrorBoundary>
                        <ErrorBoundary>
                            <Input inputProps={passwordInputProps} />
                        </ErrorBoundary>
                    </fieldset>
                    <div className={classes.remember_me_wrap}>
                        <label>
                            <div>
                                <input
                                    type="checkbox"
                                    name="remember"
                                    checked={rememberChecked}
                                    onChange={handleCheckboxChange}
                                />
                                <BsCheckLg className={classes.check_icon} />
                            </div>
                            <span>Remember me</span>
                        </label>
                    </div>
                    <div className={classes.button_wrap}>
                        <Button buttonProps={btnProps} />
                    </div>
                    <p className={classes.sign_in_link}>
                        Already have an account? <Link to="#"><span>Sign in</span></Link>
                    </p>
                </form>
            </section>
        </AuthLayout>
    )
}

export default Register