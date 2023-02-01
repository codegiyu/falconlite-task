import classes from "../styles/NoPageStyle.module.scss";
import AuthLayout from "../layout/AuthLayout";
import Button, { ButtonProps } from "../components/Button";
import { useNavigate } from "react-router-dom";

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

    return (
        <AuthLayout>
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