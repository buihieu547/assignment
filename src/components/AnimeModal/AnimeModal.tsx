import { memo } from 'react';
import { Modal, Button } from 'antd';
import { AnimeModalProps } from './types';

export const AnimeModal =  memo((props: AnimeModalProps): JSX.Element => {
    const {
        visible, onClose, data,
    } = props;

    const onCloseModal = () => onClose();

    const footer = (
        <Button onClick={onCloseModal}>Cancel</Button>
    );

    return (
        <Modal
            title="Anime Details"
            visible={visible}
            getContainer={false}
            footer={footer}
            onCancel={onCloseModal}
        >
            <div>
                Name: {data?.title}
            </div>
            <div>
                Description: {data?.synopsis}
            </div>s
            <div>
                Type: {data?.type}
            </div>
            <div>
                Score: {data?.score}
            </div>
            <div>
                Episodes: {data?.episodes}
            </div>
        </Modal>
    );
});
