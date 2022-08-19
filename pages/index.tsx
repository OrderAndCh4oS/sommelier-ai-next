import type {NextPage} from 'next'
import PageWrapper from '../components/structure/page-wrapper/page-wrapper';
import {useUser} from '@auth0/nextjs-auth0';
import IntroSpiel from '../components/intro-spiel/intro-spiel';
import WineList from '../components/wine-list/wine-list';

const Home: NextPage = () => {
    const {user, error, isLoading} = useUser();

    return (
        <PageWrapper>
            {user ? <WineList/> : <IntroSpiel/>}
        </PageWrapper>
    )
}

export default Home;
