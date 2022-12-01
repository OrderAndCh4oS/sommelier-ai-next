export default interface ITastingNote {
    userId: string,
    sk: string,
    wineSk: string,
    text: string,
    createdAt: string,
    updatedAt: string
}

export type ICreateTastingNote = Omit<ITastingNote, 'sk' | 'createdAt' | 'updatedAt'>;

export interface ISelectTastingNote {
    userId: string,
    wineSk: string,
    "tastingNoteSk": string

}
