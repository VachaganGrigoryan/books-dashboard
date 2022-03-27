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
} from '@pankod/refine-antd';
import { IAuthor } from 'interfaces';

export const AuthorList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps, sorter } = useTable<IAuthor>({
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
          dataIndex="fullName"
          key="fullName"
          title="Full Name"
          render={(value) => <TextField value={value} />}
          defaultSortOrder={getDefaultSortOrder('fullName', sorter)}
          sorter
        />
        <Table.Column<IAuthor>
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
