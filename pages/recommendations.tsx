import type {NextPage} from 'next'
import {withPageAuthRequired} from "@auth0/nextjs-auth0";
import WineRecommendations from "../components/recommendations/recommendations";
import PageWrapper from "../components/structure/page-wrapper/page-wrapper";


const Home: NextPage = () => {
    return (
        <PageWrapper>
            <WineRecommendations/>
        </PageWrapper>
    )
}

export default withPageAuthRequired(Home);
