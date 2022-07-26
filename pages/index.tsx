import type {NextPage} from 'next'
import PageWrapper from '../components/structure/page-wrapper/page-wrapper';
import IntroSpiel from '../components/intro-spiel/intro-spiel';

const Home: NextPage = () =>
    <PageWrapper>
        <IntroSpiel/>
    </PageWrapper>

export default Home;
