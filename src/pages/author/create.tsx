import { useState } from 'react';
import { IResourceComponentsProps } from '@pankod/refine-core';
import {
  Upload,
  Create,
  Form,
  Input,
  useForm,
  getValueFromEvent,
} from '@pankod/refine-antd';

import ReactMarkdown from 'react-markdown';
import ReactMde from 'react-mde';

import 'react-mde/lib/styles/css/react-mde-all.css';

import { IAuthor } from 'interfaces';

export const AuthorCreate: React.FC<IResourceComponentsProps> = () => {
  const [selectedTab, setSelectedTab] = useState<'write' | 'preview'>('write');

  const { formProps, saveButtonProps } = useForm<IAuthor>();

  return (
    <Create saveButtonProps={saveButtonProps}>
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
        <Form.Item label="Image">
          <Form.Item
            name="image"
            valuePropName="fileList"
            getValueFromEvent={getValueFromEvent}
            noStyle
          >
            <Upload.Dragger
              name="file"
              action={`/media/upload`}
              listType="picture"
              maxCount={5}
              multiple
            >
              <p className="ant-upload-text">Drag & drop a file in this area</p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>
      </Form>
    </Create>
  );
};
