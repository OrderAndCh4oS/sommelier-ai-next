import ITastingNote from './tasting-note.interface';


export default interface IWine {
    userId: string
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
    tastingNoteSk?: string
    tastingNote?: string
    tastingNotes?: ITastingNote[]
}

export type ICreateWine = Omit<IWine, 'sk' | 'createdAt' | 'updatedAt'>;
export type IUpdateWine = Omit<IWine, 'createdAt' | 'updatedAt'>;
