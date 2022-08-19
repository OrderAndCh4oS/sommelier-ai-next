import type {NextPage} from 'next'
import {withPageAuthRequired} from '@auth0/nextjs-auth0';
import TastingNotes from '../components/tasting-notes/tasting-notes';
import PageWrapper from '../components/structure/page-wrapper/page-wrapper';

const Home: NextPage = () => {
    return (
        <PageWrapper>
            <TastingNotes/>
        </PageWrapper>
    )
}

export default withPageAuthRequired(Home);
