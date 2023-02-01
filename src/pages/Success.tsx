import classes from "../styles/SuccessStyle.module.scss";
import AuthLayout from "../layout/AuthLayout";
import Button, { ButtonProps } from "../components/Button";
import checkCircle from "../images/check-circle.png";

const Success: React.FC = () => {
    const handleClick = () => {

    }

    const btnProps: ButtonProps = {
        type: "button",
        text: "Do Nothing",
        disabled: false,
        handleClick
    }

    return (
        <AuthLayout>
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