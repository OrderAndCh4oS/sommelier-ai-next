import ITastingNote from './tasting-note.interface';


export default interface IWine {
    userId: string,
    sk: string
    name: string
    style: string
    country: string
    region: string
    vineyard: string
    vintage: number
    score: number
    flavourProfile: string[]
    createdAt: string
    updatedAt: string
    tastingNoteId?: string
    tastingNote?: string
    tastingNotes?: ITastingNote[]
}

export type ICreateWine = Omit<IWine, 'userId' | 'sk' | 'createdAt' | 'updatedAt'>;
export type IUpdateWine = Omit<IWine, 'userId' | 'tastingNotes' | 'tastingNote' | 'tastingNoteId' | 'createdAt' | 'updatedAt'>;
