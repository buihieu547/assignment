import { Table } from 'antd';
import { AnimeListPropsType } from './types';

export const AnimeList = <G extends Record<string, unknown>>(
    props: AnimeListPropsType<G>,
): JSX.Element => {
    const { columns, dataSource, onClickRow } = props;

    return (
        <Table
            pagination={{
                showSizeChanger: true,
                responsive: true,
            }}
            onRow={(record: any) => {
                return {
                    onClick: () => {
                        onClickRow(record);
                    }
                };
            }}
            size="small"
            columns={columns}
            dataSource={dataSource}
            scroll={{ x: 'calc(100vw - 30px)', y: 'calc(100vh - 270px)' }}
            sticky
        />
    );
};
