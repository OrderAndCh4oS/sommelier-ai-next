import type {NextPage} from 'next'
import {useUser} from "@auth0/nextjs-auth0";
import PageWrapper from "../components/structure/page-wrapper/page-wrapper";
import styles from '../styles/landing-page.module.css';

const Home: NextPage = () => {
    const {user, error, isLoading} = useUser();

    if (isLoading) return <PageWrapper><div>Authenticating…</div></PageWrapper>
    if (error) return <PageWrapper><div>{error.message}</div></PageWrapper>;

    return (
        <PageWrapper>
            <h1 className={styles.title}>Sommelier AI</h1>
            <p className={styles.intro}>
                Sommelier AI is the perfect tool for anyone looking to improve their wine tasting skills and knowledge.
                Using GPT-3 technology, Sommelier AI generates wine tasting notes and provides recommendations
                for new wines to try. With Sommelier AI, you'll be able to find the perfect wines for any occasion and
                learn more about the myriad of flavours and aromas that make up your favourite wines. Whether a beginner
                wine taster or a seasoned sommelier, Sommelier AI can help you improve your skills and find new wines to
                enjoy.
            </p>
        </PageWrapper>
    )
}

export default Home;
