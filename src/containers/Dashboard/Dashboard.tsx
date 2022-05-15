import {
    useMemo, useState, memo, useEffect,
} from 'react';
import { AxiosError } from 'axios';
import { message as Message, Card, Skeleton } from 'antd';
import { AnimeList } from 'components/AnimeList';
import { AnimeFilterBar } from 'components/AnimeFilterBar';
import {
    AnimeService, AnimeListDataConvert
} from 'services/Anime';
import { AnimeModal } from 'components/AnimeModal';

const Dashboard = memo((): JSX.Element => {
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState({
        q: '',
        p: 1,
    });
    const [details, setDetails] = useState<{
        visible: boolean,
        data?: AnimeListDataConvert,
    }>({
        visible: false,
        data: undefined,
    });
    const [animeList, setAnimeList] = useState<AnimeListDataConvert[]>([]);
    const animeService = useMemo(() => new AnimeService(), []);

    const onFilter = (name: string): void => setPage({
        q: name,
        p: 1,
    });

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

    const onChangePage = (p: number) => setPage({
        q: page.q,
        p,
    });

    const fetchAnimeList = async (): Promise<void> => {
        if (loading) {
            return;
        }

        setLoading(true);
        try {
            const res = await animeService.getAnimeList({
                q: page.q,
                page: page.p,
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

    const renderList = (): JSX.Element => {
        if (loading) {
            return <Card><Skeleton active /></Card>;
        }

        return (
            <AnimeList
                columns={columns}
                dataSource={animeList}
                onClickRow={onShowDetails}
                onChangePage={onChangePage}
                page={page.p}
            />
        );
    };

    useEffect(() => {
        fetchAnimeList();
    }, [page]);

    return (
        <>
            <AnimeModal
                visible={details.visible}
                data={details.data}
                onClose={onCloseModal}
            />
            <AnimeFilterBar onFilter={onFilter} />
            {renderList()}
        </>
    );
});

export default Dashboard;
