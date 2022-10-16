import type {NextApiRequest, NextApiResponse} from 'next'
import {getAccessToken, withApiAuthRequired} from '@auth0/nextjs-auth0';
import axios from 'axios';
import IWine from '../../interface/wine-list.interface';
import {trimIndents} from '../../utilities/trim-indents';

export default withApiAuthRequired(
    async function handler(req: NextApiRequest, res: NextApiResponse) {
        try {
            const {accessToken} = await getAccessToken(req, res);
            // Todo: return 400 if missing params
            const tastingNotes = req.body.tastingNotes
            const wine = req.body.wine as IWine;
            const prompt = trimIndents`                
                tasting notes: ${tastingNotes.trim()}

                rewrite and embellish the tasting notes about a ${wine.vintage} vintage ${wine.style} wine from the ${wine.region} of ${wine.country}:`;

            const response = await axios.post(
                'https://ao2jyzs9o3.execute-api.eu-west-1.amazonaws.com/prod/completion',
                {prompt},
                {headers: {Authorization: `Bearer ${accessToken}`}
            });

            res.status(200).json(response.data);
        } catch (e) {
            console.log(e);
            res.status(500).end();
        }
    }
);
