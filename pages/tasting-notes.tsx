import type {NextPage} from 'next'
import {getServerSidePropsWrapper, getSession, useUser, withPageAuthRequired} from "@auth0/nextjs-auth0";
import TastingNotesTextCompletion from "../components/tasting-notes-text-completion";
import WineRecommendations from "../components/wine-recommendations";
import PageWrapper from "../components/structure/page-wrapper/page-wrapper";

// export const getServerSideProps = getServerSidePropsWrapper(async (ctx) => {
//     const session = getSession(ctx.req, ctx.res);
//     if (session) {
//         // Use is authenticated
//     } else {
//         // User is not authenticated
//     }
// });

const Home: NextPage = () => {
    const {user, error, isLoading} = useUser();

    if (isLoading) return <div>Authenticating…</div>
    if (error) return <div>{error.message}</div>;

    return (
        <PageWrapper>
            <TastingNotesTextCompletion/>
        </PageWrapper>
    )
}

export default withPageAuthRequired(Home);
