export default interface ITastingNote {
    sk: string,
    wineSk: string,
    text: string,
    createdAt: string,
    updatedAt: string
}

export type ICreateTastingNote = Omit<ITastingNote, 'sk' | 'createdAt' | 'updatedAt'>;

export interface ISelectTastingNote {
    wineSk: string,
    tastingNoteSk: string

}
