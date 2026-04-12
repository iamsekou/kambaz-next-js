import api from "../api";

export const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export const USERS_API = `/api/users`;

export const signin = async (credentials: any) => {
  const response = await api.post(
    `${USERS_API}/signin`,
    credentials
  );
  return response.data;
};

export const signup = async (user: any) => {
  const response = await api.post(
    `${USERS_API}/signup`,
    user
  );
  return response.data;
};

export const profile = async () => {
  const response = await api.post(`${USERS_API}/profile`);
  return response.data;
};

export const signout = async () => {
  const response = await api.post(`${USERS_API}/signout`);
  return response.data;
};

export const updateUser = async (user: any) => {
  const response = await api.put(
    `${USERS_API}/${user._id}`,
    user
  );
  return response.data;
};

// ── Admin / people client functions ────────────────────────────────────────────

export const findAllUsers = async () => {
  const response = await api.get(USERS_API);
  return response.data;
};

export const findUsersByRole = async (role: string) => {
  const response = await api.get(`${USERS_API}?role=${role}`);
  return response.data;
};

export const findUsersByPartialName = async (name: string) => {
  const response = await api.get(`${USERS_API}?name=${name}`);
  return response.data;
};

export const findUserById = async (id: string) => {
  const response = await api.get(`${USERS_API}/${id}`);
  return response.data;
};

export const deleteUser = async (userId: string) => {
  const response = await api.delete(`${USERS_API}/${userId}`);
  return response.data;
};

export const createUser = async (user: any) => {
  const response = await api.post(`${USERS_API}`, user);
  return response.data;
};
