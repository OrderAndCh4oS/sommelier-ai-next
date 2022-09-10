import axios from 'axios';
import IWine from '../interface/wine-list.interface';


const tastingNotesTextCompletionRequest = async (prompt: string, wine: IWine | null) => {
    // Todo: handle error responses
    const response = await axios.post('/api/tasting-notes-text-completion', {prompt, wine});

    return response.data;
}

export default tastingNotesTextCompletionRequest;
