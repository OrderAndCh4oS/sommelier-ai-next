import type {NextApiRequest, NextApiResponse} from 'next'
import {getAccessToken, withApiAuthRequired} from '@auth0/nextjs-auth0';
import axios from 'axios';

export default withApiAuthRequired(
    async function handler(req: NextApiRequest, res: NextApiResponse) {
        try {
            const {accessToken} = await getAccessToken(req, res);
            const {sk} = req.query as {sk: string};
            console.log('REQ SK', sk)
            const response = await axios.get(
                `https://ao2jyzs9o3.execute-api.eu-west-1.amazonaws.com/prod/wine-list/${encodeURIComponent(sk)}`,
                {headers: {Authorization: `Bearer ${accessToken}`}}
            );
            console.log('response', response);
            console.log('data', response.data);
            res.status(200).json(response.data);
        } catch (e) {
            console.log(e);
            res.status(500).end();
        }
    }
);
