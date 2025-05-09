export interface User {
  username: string;
  email: string | null;
  createdAt: string;
  updatedAt: string
}

export interface ResponseData<T = any> {
  code: number;
  message: string;
  data: T;
}
