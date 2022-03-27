import { IResourceComponentsProps, useMany } from '@pankod/refine-core';
import {
  List,
  Table,
  TextField,
  useTable,
  getDefaultSortOrder,
  DateField,
  Space,
  EditButton,
  DeleteButton,
  useSelect,
  TagField,
  FilterDropdown,
  Select,
  ShowButton,
  Image,
} from '@pankod/refine-antd';
import { IAuthor, IBook, ICategory } from 'interfaces';

export const PostList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps, sorter } = useTable<IBook>({
    // initialSorter: [
    //   {
    //     field: "id",
    //     order: "desc",
    //   },
    // ],
  });

  // const authorIds: string | any[] = tableProps?.dataSource?.map((item) => item.author._id) ?? [];
  //
  // const { data: authorData, isLoading } = useMany<IAuthor>({
  //   resource: "authors",
  //   ids: authorIds,
  //   queryOptions: {
  //     enabled: authorIds.length > 0,
  //   },
  // });
  // //
  // const { selectProps: authorSelectProps } = useSelect<IAuthor>({
  //   resource: "authors",
  // });

  return (
    <List>
      <Table {...tableProps} rowKey="_id">
        <Table.Column
          dataIndex="_id"
          key="_id"
          title="ID"
          render={(value) => <TextField value={value} />}
          defaultSortOrder={getDefaultSortOrder('_id', sorter)}
          sorter
        />
        <Table.Column
          dataIndex="images"
          key="images"
          title="Image"
          render={(images) => <Image height={50} src={images[0]?.url} />}
        />
        <Table.Column
          dataIndex="title"
          key="title"
          title="Title"
          render={(value) => <TextField value={value} />}
          defaultSortOrder={getDefaultSortOrder('title', sorter)}
          sorter
        />
        <Table.Column
          dataIndex={['author', 'fullName']}
          title="Author"
          render={(value) => <TextField value={value} />}
          defaultSortOrder={getDefaultSortOrder('author', sorter)}
          sorter
        />
        <Table.Column
          dataIndex={['publisher', 'name']}
          title="Publisher"
          render={(value) => <TextField value={value} />}
          defaultSortOrder={getDefaultSortOrder('publisher', sorter)}
          sorter
        />
        <Table.Column
          dataIndex="status"
          key="status"
          title="Status"
          render={(value) => <TagField value={value} />}
          defaultSortOrder={getDefaultSortOrder('status', sorter)}
          sorter
        />
        <Table.Column
          dataIndex="createdAt"
          key="createdAt"
          title="Created At"
          render={(value) => <DateField value={value} format="LLL" />}
          defaultSortOrder={getDefaultSortOrder('createdAt', sorter)}
          sorter
        />
        {/*<Table.Column*/}
        {/*  dataIndex={["authors", "_id"]}*/}
        {/*  title="Author"*/}
        {/*  render={(value) => {*/}
        {/*    if (isLoading) {*/}
        {/*      return <TextField value="Loading..." />;*/}
        {/*    }*/}

        {/*    return (*/}
        {/*      <TextField*/}
        {/*        value={*/}
        {/*          authorData?.data.find((item) => item._id === value)?.fullName*/}
        {/*        }*/}
        {/*      />*/}
        {/*    );*/}
        {/*  }}*/}
        {/*  filterDropdown={(props) => (*/}
        {/*    <FilterDropdown {...props}>*/}
        {/*      <Select*/}
        {/*        style={{ minWidth: 200 }}*/}
        {/*        mode="multiple"*/}
        {/*        placeholder="Select Author"*/}
        {/*        {...authorSelectProps}*/}
        {/*      />*/}
        {/*    </FilterDropdown>*/}
        {/*  )}*/}
        {/*/>*/}
        <Table.Column<IBook>
          title="Actions"
          dataIndex="actions"
          render={(_, record) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record._id} />
              <ShowButton hideText size="small" recordItemId={record._id} />
              <DeleteButton hideText size="small" recordItemId={record._id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
