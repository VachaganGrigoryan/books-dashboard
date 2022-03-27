export interface IAuthor {
  _id: string;
  fullName: string;
  bio: string;
  avatar: string;
}
export interface IPublisher {
  _id: string;
  name: string;
  description: string;
}
export interface ICategory {
  _id: string;
  name: string;
}
export interface IMediaFile {
  _id: string;
  key: string;
  url: string;
}
export interface IBook {
  _id: string;
  title: string;
  description: string;
  author: IAuthor;
  publisher: IPublisher;
  categories: ICategory[];
  images: IMediaFile[];
  status: 'published' | 'draft' | 'rejected';
  createdAt: string;
}

export interface IUser {
  id: string;
  fullName: string;
  email: string;
  roles: Array<string>;
  isActive: boolean;
}
