import { useState } from 'react';
import { IResourceComponentsProps } from '@pankod/refine-core';
import { Edit, Form, Input, useForm } from '@pankod/refine-antd';
import ReactMarkdown from 'react-markdown';
import ReactMde from 'react-mde';

import 'react-mde/lib/styles/css/react-mde-all.css';

import { IPublisher } from 'interfaces';

export const PublisherEdit: React.FC<IResourceComponentsProps> = () => {
  const [selectedTab, setSelectedTab] = useState<'write' | 'preview'>('write');

  const { formProps, saveButtonProps, queryResult } = useForm<IPublisher>();

  // const { selectProps: categorySelectProps } = useSelect<IBook>({
  //   resource: "categories",
  //   defaultValue: queryResult?.data?.data.categories.map(c=>c.id),
  // });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
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
