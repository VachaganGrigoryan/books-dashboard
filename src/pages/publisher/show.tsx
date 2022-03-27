import { IResourceComponentsProps, useShow } from '@pankod/refine-core';
import { Show, Typography, MarkdownField } from '@pankod/refine-antd';

import { IPublisher } from 'interfaces';
const { Title, Text } = Typography;

export const PublisherShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow<IPublisher>();
  const { data, isLoading } = queryResult;
  const record = data?.data;
  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Name</Title>
      <Text>{record?.name}</Text>

      <Title level={5}>Description</Title>
      <MarkdownField value={record?.description} />
    </Show>
  );
};
