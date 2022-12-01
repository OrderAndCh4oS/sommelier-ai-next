import axios from 'axios';
import {ICreateTastingNote} from '../../interface/tasting-note.interface';

const addTastingNoteRequest = async (tastingNote: ICreateTastingNote) => {
    // Todo: handle error responses
    const response = await axios.put('/api/wine/tasting-note', {tastingNote});

    return response.data;
}

export default addTastingNoteRequest;
