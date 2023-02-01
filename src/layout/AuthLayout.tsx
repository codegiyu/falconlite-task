import classes from "../styles/AuthLayoutStyle.module.scss";
import ImgSection from "../components/ImgSection";
import ErrorBoundary from "../components/ErrorBoundary";
import Header from "../components/Header";

interface CompWithChildren {
    children?: React.ReactNode
}

const AuthLayout: React.FC<CompWithChildren> = (props) => {
    return (
        <div className={classes.page_body}>
            <main className={classes.main_section}>
                <ErrorBoundary>
                    <Header />
                </ErrorBoundary>
                {props.children}
            </main>
            <section className={classes.image_section}>
                <ImgSection />
            </section>
        </div>
    )
}

export default AuthLayout