import type {NextPage} from 'next'
import PageWrapper from '../../../components/structure/page-wrapper/page-wrapper';
import StoreWineForm from '../../../components/create-wine-form/store-wine-form';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import {useUser} from '@auth0/nextjs-auth0';
import getWineRequest from '../../../requests/wine/get-wine.request';
import IWine from '../../../interface/wine-list.interface';

const EditWine: NextPage = () => {
    const {user} = useUser();
    const router = useRouter();
    const {sk} = router.query;
    const [storedWine, setStoredWine] = useState<IWine | null>(null);

    useEffect(() => {
        if(!user || !sk || !user.sub) return;
        (async () => {
            console.log('user', user);
            const wine = await getWineRequest(
                user.sub as string,
                sk as string
            );
            console.log('wine', wine)
            setStoredWine(wine);
        })()
    }, [user, sk]);

    return (
        <PageWrapper>
            <StoreWineForm storedWine={storedWine}/>
        </PageWrapper>
    )
}

export default EditWine;
