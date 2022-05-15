import { Table } from 'antd';
import { AnimeListPropsType } from './types';

export const AnimeList = <G extends Record<string, unknown>>(
    props: AnimeListPropsType<G>,
): JSX.Element => {
    const {
        columns, dataSource, onClickRow, onChangePage, page,
    } = props;

    return (
        <Table
            pagination={{
                showSizeChanger: false,
                responsive: true,
                pageSize: 50,
                current: page,
                total: 850,
                onChange: (page) => {
                    onChangePage(page);
                }
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
            scroll={{ x: 'calc(100vw - 30px)', y: 'calc(100vh - 300px)' }}
            sticky
        />
    );
};
