import {useUser} from "@auth0/nextjs-auth0";
import styles from './styles.module.css'
import {FC, ReactNode} from "react";
import HeaderBar from "../header-bar/header-bar";
import Footer from "../footer/footer";

interface IPageWrapperProps {
    children: ReactNode
}

const PageWrapper: FC<IPageWrapperProps> = ({children}) => {
    const {user, error, isLoading} = useUser();

    // Todo: show toast notification if login fails.
    // if (error) return <div>{error.message}</div>;

    return (
        <div className={styles.pageWrapper}>
            <HeaderBar />
            <main className={styles.mainContent}>
                <div className={styles.mainContentSpacer}>
                    {isLoading ? <p className={styles.loading}>Initialising…</p>: children}
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default PageWrapper;
