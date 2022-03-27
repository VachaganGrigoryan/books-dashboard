import { Refine } from '@pankod/refine-core';
import { notificationProvider, LoginPage } from '@pankod/refine-antd';
import routerProvider from '@pankod/refine-react-router-v6';
import '@pankod/refine-antd/dist/styles.min.css';
import nestjsxCrudDataProvider from '@pankod/refine-nestjsx-crud';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

import {
  Title,
  Header,
  Sider,
  Footer,
  Layout,
  OffLayoutArea,
} from 'components/layout';

import { PostList, PostCreate, PostEdit, PostShow } from 'pages/book';
import {
  AuthorCreate,
  AuthorEdit,
  AuthorList,
  AuthorShow,
} from './pages/author';
import {
  PublisherCreate,
  PublisherEdit,
  PublisherList,
  PublisherShow,
} from './pages/publisher';
import {
  CategoryCreate,
  CategoryEdit,
  CategoryList,
  CategoryShow,
} from './pages/category';
import { DashboardPage } from './pages/dashboard';

const axiosInstance = axios.create();

import { authProvider } from './authProvider';

const App: React.FC = () => {
  const API_URL = 'http://127.0.0.1:8000/api';
  axiosInstance.defaults.headers.common = {
    Authorization: `Bearer ${authProvider.getToken()}`,
  };
  const dataProvider = nestjsxCrudDataProvider(API_URL, axiosInstance);
  console.log(axiosInstance.defaults.headers);

  return (
    <Refine
      routerProvider={routerProvider}
      notificationProvider={notificationProvider}
      dataProvider={dataProvider}
      authProvider={authProvider}
      LoginPage={LoginPage}
      DashboardPage={DashboardPage}
      resources={[
        {
          name: 'books',
          list: PostList,
          create: PostCreate,
          edit: PostEdit,
          show: PostShow,
        },
        {
          name: 'authors',
          list: AuthorList,
          create: AuthorCreate,
          edit: AuthorEdit,
          show: AuthorShow,
        },
        {
          name: 'publishers',
          list: PublisherList,
          create: PublisherCreate,
          edit: PublisherEdit,
          show: PublisherShow,
        },
        {
          name: 'categories',
          list: CategoryList,
          create: CategoryCreate,
          edit: CategoryEdit,
          show: CategoryShow,
        },
      ]}
      Title={Title}
      Header={Header}
      Sider={Sider}
      Footer={Footer}
      Layout={Layout}
      OffLayoutArea={OffLayoutArea}
    />
  );
};

export default App;
