import type {NextPage} from 'next'
import PageWrapper from '../components/structure/page-wrapper/page-wrapper';
import IntroSpiel from '../components/intro-spiel/intro-spiel';
import {useUser} from "@auth0/nextjs-auth0";
import TastingNotes from "../components/tasting-notes/tasting-notes";

const Home: NextPage = () => {
    const {user} = useUser();
    return (
        <PageWrapper>
            {!user ? <IntroSpiel/> : <TastingNotes wine={null}/>}
        </PageWrapper>
    )
}

export default Home;
