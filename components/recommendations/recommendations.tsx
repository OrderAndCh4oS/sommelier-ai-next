import {FC, useState} from 'react';
import TextForm, {TastingNotesFormData} from '../text-form/text-form';
import wineRecommendationRequest from '../../requests/wine-recommendation.request';
import WineSuggestion from '../wine-suggestion/wine-suggestion';

interface IResults {
    search: IWineShort[],
    recommendations: IWineShort[]
}

export interface IWineShort {
    name: string,
    country: string,
    region: string,
    score: string,
    vintage: string,
    notes: string
}

const regex = /^NAME: (?<name>.*?), COUNTRY: (?<country>.*?), REGION: (?<region>.*?), VINTAGE: (?<vintage>.*?), SCORE: (?<score>.*?), NOTES: (?<notes>.*?)$/;

const TastingNotesTextCompletion: FC = () => {
    const [results, setResults] = useState<IResults>({search: [], recommendations: []});
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async ({text: query}: TastingNotesFormData) => {
        setIsProcessing(true);
        setResults({search: [], recommendations: []});
        try {
            const response = await wineRecommendationRequest(query);
            const search: IWineShort[] = [];
            for (const searchResult of response.search) {
                const result = regex.exec(searchResult);
                if (!result?.groups) continue;
                search.push(result.groups as unknown as IWineShort);
            }
            const recommendations: IWineShort[] = [];
            for (const recommendationResult of response.recommend) {
                const result = regex.exec(recommendationResult);
                if (!result?.groups) continue;
                recommendations.push(result.groups as unknown as IWineShort);
            }
            setResults({search, recommendations});
        } catch (e) {
            // Todo: display error
            console.log(e);
        }
        setIsProcessing(false);
    }

    return (
        <div>
            <h2>Wine Recommendations</h2>
            <TextForm
                onSubmit={handleSubmit}
                isProcessing={isProcessing}
                buttonText={'Discover'}
                placeholder="Fruity, reminiscent of blackberries and cherries…"
            />
            {results.search.length ? (
                <>
                    <h3>Search Results</h3>
                    <div>
                        {results.search.map((wine, i) => <WineSuggestion key={`s_${i}`} wine={wine}/>)}
                    </div>
                </>
            ) : null}
            {results.recommendations.length ? (
                <>
                    <h3>Recommendations</h3>
                    <div>
                        {results.recommendations.map((wine, i) => <WineSuggestion key={`r_${i}`} wine={wine}/>)}
                    </div>
                </>
            ) : null}
        </div>
    )
}

export default TastingNotesTextCompletion;
