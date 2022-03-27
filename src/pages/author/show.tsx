import {
  IResourceComponentsProps,
  useMany,
  useOne,
  useShow,
} from '@pankod/refine-core';
import { Show, Typography, Tag, MarkdownField } from '@pankod/refine-antd';

import { IAuthor } from 'interfaces';

const { Title, Text } = Typography;

export const AuthorShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow<IAuthor>();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  // const { data: categoryData } = useOne<ICategory>({
  //   resource: "categories",
  //   id: record?.category.id ?? "",
  //   queryOptions: {
  //     enabled: !!record?.category.id,
  //   },
  // });

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Full Name</Title>
      <Text>{record?.fullName}</Text>

      <Title level={5}>Bio</Title>
      <MarkdownField value={record?.bio} />
    </Show>
  );
};
