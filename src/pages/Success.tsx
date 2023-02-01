import classes from "../styles/SuccessStyle.module.scss";
import AuthLayout from "../layout/AuthLayout";
import Button, { ButtonProps } from "../components/Button";
import checkCircle from "../images/check-circle.png";
import SEO, { SEOProps } from "../components/SEO";

const Success: React.FC = () => {
    const handleClick = () => {

    }

    const btnProps: ButtonProps = {
        type: "button",
        text: "Do Nothing",
        disabled: false,
        handleClick
    }

    const seoObj: SEOProps = {
        title: "Email Verification Successful - FalconLite Inc",
        desc: "Falconlite is platform that allows users to make cross border transactions. Our platform enables users to send, receive and transact globally."
    }

    return (
        <AuthLayout>
            <SEO seoProps={seoObj} />
            <section className={classes.success_section}>
                <img src={checkCircle} alt="success" />
                <p>Email verification successful</p>
                <div className={classes.button_wrap}>
                    <Button buttonProps={btnProps} />
                </div>
            </section>
        </AuthLayout>
    )
}

export default Success