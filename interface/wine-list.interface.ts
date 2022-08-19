export default interface IWine {
    userId: string,
    sk: string,
    name: string,
    style: string,
    country: string,
    region: string,
    vineyard: string,
    vintage: number,
    score: number,
    tastingNote: string,
    flavourProfile: string[],
    detailPrompt: string,
    starterText: string,
    embedding?: number[] // Todo: require this once they're being generated
    createdAt: string,
    updatedAt: string
}

export type ICreateWine = Omit<IWine, 'sk' | 'createdAt' | 'updatedAt'>;
export type IUpdateWine = Omit<IWine, 'createdAt' | 'updatedAt'>;
