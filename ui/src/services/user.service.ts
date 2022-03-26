import { http } from '../config';

interface User {
  name?: string;
  email?: string;
}

export const createUser = (user: Required<User>) =>
  http.post<User>(`/user`, user);

export const fetchCurrentUser = () => http.get<User>(`/user`);
export const fetchUserById = (id: string) =>
  http.get<User>(`/user/${id}`);
export const fetchUsers = () => http.get<User[]>(`/user/all`);

export const updateCurrentUser = (user: Partial<User>) =>
  http.post<Partial<User>>(`/user`, user);
export const updateUserById = (id: string, user: Partial<User>) =>
  http.put(`/user/${id}`, user);

export const deleteCurrentUser = () => http.delete(`/user`);
export const deleteUserById = (id: string) =>
  http.delete(`/user/${id}`);
