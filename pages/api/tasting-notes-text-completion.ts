import type {NextApiRequest, NextApiResponse} from 'next'
import {getAccessToken, withApiAuthRequired} from '@auth0/nextjs-auth0';
import axios from 'axios';
import IWine from '../../interface/wine-list.interface';
import {trimIndents} from '../../utilities/trim-indents';

export default withApiAuthRequired(
    async function handler(req: NextApiRequest, res: NextApiResponse) {
        try {
            const {accessToken} = await getAccessToken(req, res);
            // Todo: return 400 if missing param
            const tastingNotes = req.body.prompt;
            const wine = req.body?.wine ?? null as IWine | null;

            let prompt: string;

            if(wine) {
                prompt = trimIndents`Complete the following Tasting Notes describing a ${wine.vintage} vintage ${wine.style} wine from the ${wine.region} of ${wine.country} its flavour profile includes ${wine.flavourProfile.join(', ')}.
                
                Tasting Notes: ${tastingNotes.trim()}`;
            } else {
                prompt = trimIndents`Complete the following wine Tasting Notes in the style of a experienced sommelier.
                
                Tasting Notes: ${tastingNotes.trim()}`;
            }

            console.log('prompt', prompt);

            const response = await axios.post('https://ao2jyzs9o3.execute-api.eu-west-1.amazonaws.com/prod/completion',
                {prompt},
                {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            res.status(200).json(response.data);
        } catch (e) {
            console.log(e);
            res.status(500).end();
        }
    }
);
