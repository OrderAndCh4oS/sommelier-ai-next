import IWine from '../../interface/wine-list.interface';
import {useEffect, useState} from 'react';
import {useUser} from '@auth0/nextjs-auth0';
import getWineListByUserRequest from '../../requests/wine/get-wine-list-by-user.request';
import Link from 'next/link';

const WineList = () => {
    const [wineList, setWineList] = useState<IWine[]>([]);
    const {user} = useUser();

    useEffect(() => {
        // Todo: use swr to fetch wine list
        (async () => {
            const newWineList = await getWineListByUserRequest(user!.sub as string);
            setWineList(newWineList)
        })()
    }, []);

    return (
        <>
            <Link href="/wine/create">
                <a>Create Wine</a>
            </Link>
            <h2>Wine List</h2>
            {wineList.map(wine => (
                <div key={wine.sk}>
                    <h3>{wine.name}</h3>
                    <p>{wine.country}, {wine.region}, {wine.vineyard}, {wine.vintage}</p>
                    <p>{wine.score}</p>
                    <p>{wine.tastingNote}</p>
                    <Link
                        href={{
                            pathname: '/wine/edit/[sk]',
                            query: { sk: wine.sk },
                        }}
                    >
                        <a>Edit</a>
                    </Link>
                </div>
            ))}
        </>
    );
};

export default WineList;
