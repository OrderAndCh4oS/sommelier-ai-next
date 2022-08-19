import IWine from '../../interface/wine-list.interface';
import {useEffect, useState} from 'react';
import {useUser} from '@auth0/nextjs-auth0';
import getWineListByUserRequest from '../../requests/wine/get-wine-list-by-user.request';
import Link from 'next/link';

const WineList = () => {
    const [wineList, setWineList] = useState<IWine[]>([]);
    const {user} = useUser();

    useEffect(() => {
        (async () => {
            const newWineList = await getWineListByUserRequest(user!.sub as string);
            console.log(newWineList)
            setWineList(newWineList)
        })()
    }, []);

    return (
        <>
            <Link href="/create-wine">
                <a>Create Wine</a>
            </Link>
            <h2>Wine List</h2>
            {wineList.map(wine => (
                <div key={wine.sk}>
                    <h3>{wine.name}</h3>
                    <p>{wine.country}, {wine.region}, {wine.vineyard}, {wine.vintage}</p>
                    <p>{wine.score}</p>
                    <p>{wine.tastingNote}</p>
                </div>
            ))}
        </>
    );
};

export default WineList;
