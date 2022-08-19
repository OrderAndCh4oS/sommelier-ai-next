import {useUser} from '@auth0/nextjs-auth0';
import styles from './styles.module.css'
import Link from 'next/link';

const HeaderBar = () => {
    const {user, error, isLoading} = useUser();

    return (
        <header className={styles.headerBar}>
            <div>
                <Link href="/">
                    <a className={styles.siteTitle}>Sommelier AI</a>
                </Link>
            </div>
            <div className={styles.headerMenu}>
                {user
                    ? (
                        <>
                            <Link href="/tasting-notes">
                                <a className={styles.headerMenuLink}>Tasting Notes</a>
                            </Link>
                            <Link href="/recommendations">
                                <a className={styles.headerMenuLink}>Recommendations</a>
                            </Link>
                            <Link href="/api/auth/logout">
                                <a className={styles.headerMenuLink}>Logout</a>
                            </Link>
                        </>
                    ) : <Link href="/api/auth/login">
                        <a className={styles.headerMenuLink}>Login</a>
                    </Link>
                }
            </div>
        </header>
    );
}

export default HeaderBar
