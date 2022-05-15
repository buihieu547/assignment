export type AnimeListRequest = {
    q?: string,
    page?: number,
}

export type AnimeListDataRes = {
    mal_id: number,
    url: string,
    synopsis: string,
    episodes: number,
    score: number,
    title: string,
    type: string,
}

export type AnimeListDataConvert = Omit<AnimeListDataRes, 'mal_id'> & {
    id: number,
    key: number,
}
