import { useState } from 'react';
import { IResourceComponentsProps } from '@pankod/refine-core';
import {
  Edit,
  Form,
  Input,
  Select,
  useForm,
  useSelect,
} from '@pankod/refine-antd';
import ReactMarkdown from 'react-markdown';
import ReactMde from 'react-mde';

import 'react-mde/lib/styles/css/react-mde-all.css';

import { IAuthor, IBook } from 'interfaces';

export const AuthorEdit: React.FC<IResourceComponentsProps> = () => {
  const [selectedTab, setSelectedTab] = useState<'write' | 'preview'>('write');

  const { formProps, saveButtonProps, queryResult } = useForm<IAuthor>();

  // const { selectProps: categorySelectProps } = useSelect<IBook>({
  //   resource: "categories",
  //   defaultValue: queryResult?.data?.data.categories.map(c=>c._id),
  // });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Full Name"
          name="fullName"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Bio"
          name="bio"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <ReactMde
            selectedTab={selectedTab}
            onTabChange={setSelectedTab}
            generateMarkdownPreview={(markdown) =>
              Promise.resolve(<ReactMarkdown>{markdown}</ReactMarkdown>)
            }
          />
        </Form.Item>
      </Form>
    </Edit>
  );
};
