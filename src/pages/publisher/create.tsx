import { useState } from 'react';
import { IResourceComponentsProps } from '@pankod/refine-core';
import { Create, Form, Input, useForm } from '@pankod/refine-antd';

import ReactMarkdown from 'react-markdown';
import ReactMde from 'react-mde';

import 'react-mde/lib/styles/css/react-mde-all.css';

import { IPublisher } from 'interfaces';

export const PublisherCreate: React.FC<IResourceComponentsProps> = () => {
  const [selectedTab, setSelectedTab] = useState<'write' | 'preview'>('write');

  const { formProps, saveButtonProps } = useForm<IPublisher>();

  return (
    <Create saveButtonProps={saveButtonProps}>
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
    </Create>
  );
};
