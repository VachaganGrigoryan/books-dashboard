import { IResourceComponentsProps, useShow } from '@pankod/refine-core';
import { Show, Typography, MarkdownField } from '@pankod/refine-antd';

import { ICategory } from 'interfaces';
const { Title, Text } = Typography;

export const CategoryShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow<ICategory>();
  const { data, isLoading } = queryResult;
  const record = data?.data;
  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Name</Title>
      <Text>{record?.name}</Text>
    </Show>
  );
};
