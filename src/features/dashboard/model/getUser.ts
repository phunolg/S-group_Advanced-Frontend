import { axios } from '../../../shared/config/axiosInterceptor';

export interface User {
  id: string;
  email: string;
  name: string;
  roles: string[];
}

export async function getUser(): Promise<User> {
  const response = await axios.get<User>('/users/me');
  return response as unknown as User;
}
