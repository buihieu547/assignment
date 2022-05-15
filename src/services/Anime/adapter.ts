import { AnimeListDataRes, AnimeListDataConvert } from './types';

export const convertResAnimeList = (arr: AnimeListDataRes[])
: AnimeListDataConvert[] => arr.map((a) => ({
    id: a.mal_id,
    key: a.mal_id,
    url: a.url,
    synopsis: a.synopsis,
    episodes: a.episodes,
    score: a.score,
    type: a.type,
    title: a.title,
}));
