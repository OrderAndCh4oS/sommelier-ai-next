import type {NextPage} from 'next'
import PageWrapper from '../../../components/structure/page-wrapper/page-wrapper';
import StoreWineForm from '../../../components/create-wine-form/store-wine-form';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import {useUser} from '@auth0/nextjs-auth0';
import getWineRequest from '../../../requests/wine/get-wine.request';
import IWine from '../../../interface/wine-list.interface';

const EditWine: NextPage = () => {
    const router = useRouter();
    const {sk} = router.query;
    const [storedWine, setStoredWine] = useState<IWine | null>(null);

    useEffect(() => {
        if(!sk) return;
        (async () => {
            const wine = await getWineRequest(
                sk as string
            );
            setStoredWine(wine);
        })()
    }, [sk]);

    return (
        <PageWrapper>
            <StoreWineForm storedWine={storedWine}/>
        </PageWrapper>
    )
}

export default EditWine;
