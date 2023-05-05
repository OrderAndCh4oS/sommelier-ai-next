import styles from './styles.module.css'
import {FC, ReactNode} from 'react';
import HeaderBar from '../header-bar/header-bar';
import Footer from '../footer/footer';

interface IPageWrapperProps {
    children: ReactNode
}

const PageWrapper: FC<IPageWrapperProps> = ({children}) =>
    <div className={styles.pageWrapper}>
        <HeaderBar/>
        <main className={styles.mainContent}>
            <div className={styles.mainContentSpacer}>
                {children}
            </div>
        </main>
        <Footer/>
    </div>

export default PageWrapper;
