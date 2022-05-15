import { ColumnType } from 'antd/lib/table/interface';
import { TableProps } from 'antd';
import { AnimeListDataConvert } from 'services/Anime';

export type AnimeListPropsType<T> = {
    columns: ColumnType<T>[],
    onClickRow: (data: AnimeListDataConvert) => void,
} & Pick<TableProps<T>, 'dataSource'>
