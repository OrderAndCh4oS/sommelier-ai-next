import axios from 'axios';
import IWine from '../interface/wine-list.interface';


const tastingNotesTextCompletionRequest = async (tastingNotes: string, wine: IWine | null) => {
    // Todo: handle error responses
    const response = await axios.post('/api/tasting-notes-reimagine', {tastingNotes, wine});

    return response.data;
}

export default tastingNotesTextCompletionRequest;
