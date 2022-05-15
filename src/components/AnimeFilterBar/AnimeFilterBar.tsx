import { memo } from 'react';
import {
    Card, Button, Input, Form, Row, Col, Space,
} from 'antd';
import { AnimeListRequest } from 'services/Anime';

export const AnimeFilterBar = memo((
    props: { onFilter: (q: string) => void },
): JSX.Element => {
    const { onFilter } = props;
    const [form] = Form.useForm();

    const onFinish = (data: AnimeListRequest): void => onFilter(data.q || '');

    const onReset = () => form.resetFields();

    return (
        <>
            <Card>
                <Form
                    autoComplete="off"
                    form={form}
                    onFinish={onFinish}
                >
                    <Row>
                        <Col className="gutter-row" sm={24} md={12} xl={8}>
                            <Form.Item
                                label="Name"
                                name="q"
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item>
                        <Space>
                            <Button type="primary" htmlType="submit">
                                Apply
                            </Button>
                            <Button onClick={onReset} htmlType="button">
                                Reset
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </>
    );
});
