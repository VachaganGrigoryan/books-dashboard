import {
  IResourceComponentsProps,
  useMany,
  useOne,
  useShow,
} from '@pankod/refine-core';
import {
  Show,
  Typography,
  Tag,
  MarkdownField,
  Image,
  Carousel,
  Card,
  Row,
  Col,
  DateField,
} from '@pankod/refine-antd';

import { IBook } from 'interfaces';

const { Title, Text } = Typography;

export const PostShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow<IBook>();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Title</Title>
      <Text>{record?.title}</Text>

      <div className="site-card-wrapper">
        <Row gutter={16}>
          {record?.images.map((item) => {
            return (
              <Col span={4}>
                <Card
                  bordered={false}
                  // hoverable
                  // cover={<img alt="example" src={item.url} />}
                >
                  <Image src={item.url} />
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>

      <Title level={5}>Status</Title>
      <Text>
        <Tag>{record?.status}</Tag>
      </Text>

      <Title level={5}>Author</Title>
      <Text>{record?.author.fullName}</Text>

      <Title level={5}>Publisher</Title>
      <Text>{record?.publisher.name}</Text>

      <Title level={5}>Category</Title>
      <Text>
        {record?.categories.map((item) => (
          <Tag>{item.name}</Tag>
        ))}
      </Text>

      <Title level={5}>Description</Title>
      <MarkdownField value={record?.description} />

      <Title level={5}>Creation Date</Title>
      <Text>
        <DateField value={record?.createdAt} format="LLL" />
      </Text>
    </Show>
  );
};
