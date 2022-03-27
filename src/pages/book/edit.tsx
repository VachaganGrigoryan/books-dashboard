import { useState } from 'react';
import { IResourceComponentsProps, useApiUrl } from '@pankod/refine-core';
import {
  Edit,
  Form,
  Input,
  message,
  RcFile,
  Select,
  Upload,
  UploadFile,
  useFileUploadState,
  useForm,
  useSelect,
} from '@pankod/refine-antd';
import ReactMarkdown from 'react-markdown';
import ReactMde from 'react-mde';

import 'react-mde/lib/styles/css/react-mde-all.css';

import { IAuthor, IBook, ICategory, IPublisher } from 'interfaces';
import { normalizeFile } from '../../utility';

export const PostEdit: React.FC<IResourceComponentsProps> = () => {
  const [selectedTab, setSelectedTab] = useState<'write' | 'preview'>('write');

  const { formProps, saveButtonProps, queryResult } = useForm<IBook>();
  const apiUrl = useApiUrl();

  const { selectProps: authorSelectProps } = useSelect<IAuthor>({
    resource: 'authors',
    optionLabel: 'fullName',
    optionValue: '_id',
  });
  const { selectProps: publisherSelectProps } = useSelect<IPublisher>({
    resource: 'publishers',
    optionLabel: 'name',
    optionValue: '_id',
  });
  const { selectProps: categorySelectProps } = useSelect<ICategory>({
    resource: 'categories',
    optionLabel: 'name',
    optionValue: '_id',
  });

  const [images, setImages] = useState([]);
  const { isLoading, onChange } = useFileUploadState();

  // if (queryResult?.data?.data?.images) {
  //   // @ts-ignore
  //   setImages(queryResult?.data?.data?.images)
  // }

  console.log(queryResult?.data?.data?.images);
  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Status"
          name="status"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            options={[
              {
                label: 'published',
                value: 'published',
              },
              {
                label: 'draft',
                value: 'draft',
              },
              {
                label: 'rejected',
                value: 'rejected',
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          label="Categories"
          name="categories"
          rules={[
            {
              required: true,
            },
          ]}
          getValueProps={(categories?: { _id: string }[]) => {
            return { value: categories?.map((category) => category._id) };
          }}
          getValueFromEvent={(args: string[]) => {
            return args.map((item) => ({
              _id: item,
            }));
          }}
        >
          <Select mode="multiple" {...categorySelectProps} />
        </Form.Item>
        <Form.Item
          label="Author"
          name={['author', '_id']}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...authorSelectProps} />
        </Form.Item>
        <Form.Item
          label="Publisher"
          name={['publisher', '_id']}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...publisherSelectProps} />
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
        <Form.Item label="Images">
          <Form.Item
            name="images"
            valuePropName="fileList"
            normalize={(event) => normalizeFile(event, images)}
            noStyle
          >
            <Upload.Dragger
              name="file"
              action={`${apiUrl}/media/upload`}
              accept=".jpg,.jpeg,.jfif,.pjpeg,.pjp,.png,.webp"
              listType="picture-card"
              maxCount={5}
              multiple
              onChange={(response) => {
                // if (response.file.status !== 'uploading') {
                //   console.log(response.file, response.fileList);
                // }
                if (response.file.status === 'done') {
                  message.success(
                    `${response.file.name} file uploaded successfully`,
                  );
                  const img_list: Array<UploadFile> = [
                    ...images,
                    response.file,
                  ];
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  setImages(img_list);
                } else if (response.file.status === 'error') {
                  message.error(`${response.file.name} file upload failed.`);
                }
              }}
              customRequest={async ({ file, onError, onSuccess }) => {
                try {
                  const rcFile = file as RcFile;

                  const formData = new FormData();
                  formData.append('location', 'books/');
                  formData.append('file', rcFile);

                  const data = await fetch(`${apiUrl}/media/upload`, {
                    method: 'POST',
                    body: formData,
                  })
                    .then((response) => response.json())
                    .catch(
                      (error) => onError && onError(new Error('Upload Error')),
                    );

                  const xhr = new XMLHttpRequest();
                  onSuccess && onSuccess(data, xhr);
                } catch (error) {
                  onError && onError(new Error('Upload Error'));
                }
              }}
            >
              <p className="ant-upload-text">Drag & drop a file in this area</p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>
      </Form>
    </Edit>
  );
};
