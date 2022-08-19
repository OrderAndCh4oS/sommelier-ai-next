import axios from 'axios';


const wineRecommendationRequest = async (query: string) => {
    // Todo: handle error responses
    const response = await axios.post('/api/wine-recommendations', {query});

    return response.data;
}

export default wineRecommendationRequest;
