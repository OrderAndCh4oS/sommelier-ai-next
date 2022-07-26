import {FC, useState} from "react";
import TextForm from "./text-form/text-form";
import {FormikHelpers} from "formik";
import wineRecommendationRequest from "../requests/wine-recommendation.request";
import WineSuggestion from "./wine-suggestion/wine-suggestion";

interface IResults {
    search: IWine[],
    recommendations: IWine[]
}

export interface IWine {
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

    const handleSubmit = async ({text: query}: { text: string }, _: FormikHelpers<any>) => {
        const response = await wineRecommendationRequest(query);
        const search: IWine[] = [];
        for (const searchResult of response.search) {
            const result = regex.exec(searchResult);
            if (!result?.groups) continue;
            search.push(result.groups as unknown as IWine);
        }
        const recommendations: IWine[] = [];
        for (const recommendationResult of response.recommend) {
            const result = regex.exec(recommendationResult);
            if (!result?.groups) continue;
            recommendations.push(result.groups as unknown as IWine);
        }
        setResults({search, recommendations})
    }

    return (
        <div>
            <h2>Wine Recommendations</h2>
            <TextForm handleSubmit={handleSubmit} buttonText={'Discover'}/>
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
