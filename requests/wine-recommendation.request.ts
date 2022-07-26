import axios from "axios";


const wineRecommendationRequest = async (query: string) => {
    const response = await axios.post('/api/wine-recommendations', {query});

    return response.data;
}

export default wineRecommendationRequest;
