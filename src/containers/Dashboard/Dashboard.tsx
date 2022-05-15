import {
    useMemo, useState, memo, useEffect,
} from 'react';
import { AxiosError } from 'axios';
import { message as Message } from 'antd';
import { AnimeList } from 'components/AnimeList';
import { AnimeFilterBar } from 'components/AnimeFilterBar';
import {
    AnimeService, AnimeListDataConvert
} from 'services/Anime';
import { AnimeModal } from 'components/AnimeModal';

const Dashboard = memo((): JSX.Element => {
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState<{
        visible: boolean,
        data?: AnimeListDataConvert,
    }>({
        visible: false,
        data: undefined,
    });
    const [animeList, setAnimeList] = useState<AnimeListDataConvert[]>([]);
    const animeService = useMemo(() => new AnimeService(), []);

    const onFilter = (name: string): void => {
        console.log(name);
    };

    const onShowDetails = (d: AnimeListDataConvert): void => {
        setDetails({
            visible: true,
            data: d,
        });
    };

    const onCloseModal = (): void => setDetails({
        visible: false,
        data: undefined,
    });

    const fetchAnimeList = async (): Promise<void> => {
        if (loading) {
            return;
        }

        setLoading(true);
        try {
            const res = await animeService.getAnimeList({
                q: '123123',
                page: 1,
            });
            setAnimeList(res);
        } catch (err) {
            const { message } = err as AxiosError;
            if (message) {
                Message.error(message);
            }

            setAnimeList([]);
        }
        
        setLoading(false);
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'title',
            width: 100,
            sorter: (
                a: AnimeListDataConvert, b: AnimeListDataConvert,
            ) => a.title.localeCompare(b.title),
        },
        {
            title: 'Episodes',
            dataIndex: 'episodes',
            width: 100,
            sorter: (
                a: AnimeListDataConvert, b: AnimeListDataConvert,
            ) => a.episodes - b.episodes,
        },
        {
            title: 'Type',
            dataIndex: 'type',
            width: 100,
            sorter: (
                a: AnimeListDataConvert, b: AnimeListDataConvert,
            ) => a.type.localeCompare(b.type),
        },
        {
            title: 'Score',
            dataIndex: 'score',
            width: 100,
            sorter: (
                a: AnimeListDataConvert, b: AnimeListDataConvert,
            ) => a.score - b.score,
        },
    ];

    useEffect(() => {
        fetchAnimeList();
    }, []);

    return (
        <>
            <AnimeModal
                visible={details.visible}
                data={details.data}
                onClose={onCloseModal}
            />
            <AnimeFilterBar onFilter={onFilter} />
            <AnimeList
                columns={columns}
                dataSource={animeList}
                onClickRow={onShowDetails}
            />
        </>
    );
});

export default Dashboard;
