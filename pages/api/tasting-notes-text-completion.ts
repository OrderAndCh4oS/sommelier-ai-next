import type {NextApiRequest, NextApiResponse} from 'next'
import {getAccessToken, withApiAuthRequired} from '@auth0/nextjs-auth0';
import axios from 'axios';
import IWine from '../../interface/wine-list.interface';

export default withApiAuthRequired(
    async function handler(req: NextApiRequest, res: NextApiResponse) {
        try {
            const {accessToken} = await getAccessToken(req, res);
            // Todo: return 400 if missing param
            const prompt = req.body.prompt;
            const wine = req.body.wine as IWine;

            const promptIntro = 'Complete the following TASTING_NOTES ' +
                `describing a ${wine.vintage} vintage ${wine.style} wine from the ${wine.region} of ${wine.country} ` +
                `its flavour profile includes ${wine.flavourProfile.join(', ')}.`;
            const preparedPrompt = `${promptIntro}\n\nTASTING_NOTES: ${prompt.trim()}`;

            const response = await axios.post('https://ao2jyzs9o3.execute-api.eu-west-1.amazonaws.com/prod/completion', {prompt: preparedPrompt}, {
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
