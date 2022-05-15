import { HttpClient } from 'utils/httpClient';
import { AnimeListDataRes, AnimeListDataConvert, AnimeListRequest } from './types';
import { convertResAnimeList } from './adapter';

export class AnimeService {
    getAnimeList(params: AnimeListRequest): Promise<AnimeListDataConvert[]> {
        return HttpClient.get<AnimeListDataRes[]>('search/anime', params)
            .then((res: AnimeListDataRes[]) => convertResAnimeList(res));
    }
}
