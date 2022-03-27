import { IResourceComponentsProps } from '@pankod/refine-core';
import {
  List,
  Table,
  TextField,
  useTable,
  getDefaultSortOrder,
  Space,
  EditButton,
  DeleteButton,
  ShowButton,
} from '@pankod/refine-antd';
import { IPublisher } from 'interfaces';

export const PublisherList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps, sorter } = useTable<IPublisher>({
    // initialSorter: [
    //   {
    //     field: "id",
    //     order: "desc",
    //   },
    // ],
  });

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
          dataIndex="name"
          key="name"
          title="Name"
          render={(value) => <TextField value={value} />}
          defaultSortOrder={getDefaultSortOrder('name', sorter)}
          sorter
        />
        <Table.Column<IPublisher>
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
