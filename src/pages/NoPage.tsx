import classes from "../styles/NoPageStyle.module.scss";
import AuthLayout from "../layout/AuthLayout";
import Button, { ButtonProps } from "../components/Button";
import { useNavigate } from "react-router-dom";
import SEO, { SEOProps } from "../components/SEO";

const NoPage: React.FC = () => {
    let navigate = useNavigate()

    const handleClick = () => {
        navigate("/")
    }

    const btnProps: ButtonProps = {
        type: "button",
        text: "Return to Register",
        disabled: false,
        handleClick
    }

    const seoObj: SEOProps = {
        title: "404 - FalconLite Inc",
        desc: "Falconlite is platform that allows users to make cross border transactions. Our platform enables users to send, receive and transact globally."
    }

    return (
        <AuthLayout>
            <SEO seoProps={seoObj} />
            <section className={classes.success_section}>
                <h1>404</h1>
                <p>The page you are looking for does not exist!</p>
                <div className={classes.button_wrap}>
                    <Button buttonProps={btnProps} />
                </div>
            </section>
        </AuthLayout>
    )
}

export default NoPage