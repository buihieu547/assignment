import {
    AnimeService, AnimeListDataConvert
} from 'services/Anime';

export type AnimeModalProps = {
    visible: boolean,
    onClose: () => void,
    data?: AnimeListDataConvert,
}
