import type {NextPage} from 'next'
import {useUser, withPageAuthRequired} from "@auth0/nextjs-auth0";
import TastingNotesTextCompletion from "../components/tasting-notes-text-completion";
import PageWrapper from "../components/structure/page-wrapper/page-wrapper";


const Home: NextPage = () => {
    return (
        <PageWrapper>
            <TastingNotesTextCompletion/>
        </PageWrapper>
    )
}

export default withPageAuthRequired(Home);
