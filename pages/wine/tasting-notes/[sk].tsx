import type {NextPage} from 'next'
import {withPageAuthRequired} from '@auth0/nextjs-auth0';
import TastingNotes from '../../../components/tasting-notes/tasting-notes';
import PageWrapper from '../../../components/structure/page-wrapper/page-wrapper';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import IWine from '../../../interface/wine-list.interface';
import getWineRequest from '../../../requests/wine/get-wine.request';

const TastingNotesPage: NextPage = () => {
    const router = useRouter();
    const {sk} = router.query;
    const [wine, setWine] = useState<IWine | null>(null);

    // Todo: React Query would be be useful here
    useEffect(() => {
        if (!sk) return;
        (async () => {
            const wine = await getWineRequest(sk as string);
            setWine(wine);
        })()
    }, [sk]);

    return (
        <PageWrapper>
            <TastingNotes wine={wine}/>
        </PageWrapper>
    )
}

export default withPageAuthRequired(TastingNotesPage);
