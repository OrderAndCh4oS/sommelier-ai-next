import type {NextPage} from 'next'
import {useUser, withPageAuthRequired} from '@auth0/nextjs-auth0';
import TastingNotes from '../../../components/tasting-notes/tasting-notes';
import PageWrapper from '../../../components/structure/page-wrapper/page-wrapper';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import IWine from '../../../interface/wine-list.interface';
import getWineRequest from '../../../requests/wine/get-wine.request';

const TastingNotesPage: NextPage = () => {
    const {user} = useUser();
    const router = useRouter();
    const {sk} = router.query;
    const [wine, setWine] = useState<IWine | null>(null);

    useEffect(() => {
        if(!user || !sk || !user.sub) return;
        (async () => {
            const wine = await getWineRequest(
                user.sub as string,
                sk as string
            );
            setWine(wine);
        })()
    }, [user, sk]);

    return (
        <PageWrapper>
            <TastingNotes wine={wine}/>
        </PageWrapper>
    )
}

export default withPageAuthRequired(TastingNotesPage);
