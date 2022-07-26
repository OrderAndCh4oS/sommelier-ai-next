import type {NextApiRequest, NextApiResponse} from 'next'
import {getAccessToken, withApiAuthRequired} from '@auth0/nextjs-auth0';
import axios from "axios";

export default withApiAuthRequired(
    async function handler(req: NextApiRequest, res: NextApiResponse) {
        try {
            const {accessToken} = await getAccessToken(req, res);
            const query = req.body.query
            const response = await axios.post('https://ao2jyzs9o3.execute-api.eu-west-1.amazonaws.com/prod/recommendations', {query}, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            res.status(200).json(response.data);
        } catch (e) {
            res.status(500).end();
        }
    }
);