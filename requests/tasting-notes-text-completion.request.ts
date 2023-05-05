import axios from 'axios';
import IWine from '../interface/wine-list.interface';


const tastingNotesTextCompletionRequest = async (notes: string, wine: Partial<IWine> | null) => {
    try {
        const response = await axios.post('/api/tasting-notes-chat', {notes, wine});
        return response.data;
    } catch(e) {
        console.log('REQUEST_ERROR', e)
    }
}

export default tastingNotesTextCompletionRequest;
