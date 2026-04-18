import api from "../api";

export const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export const USERS_API = `/api/users`;

const tryRequests = async <T>(
  requests: Array<() => Promise<{ data: T }>>
): Promise<T> => {
  let lastError: unknown;
  for (const request of requests) {
    try {
      const { data } = await request();
      return data;
    } catch (error: any) {
      lastError = error;
      const status = error?.response?.status;
      if (status && status !== 404) {
        throw error;
      }
    }
  }
  throw lastError;
};

export const signin = async (credentials: any) => {
  return tryRequests<any>([
    () => api.post(`${USERS_API}/signin`, credentials),
    () => api.post(`/users/signin`, credentials),
    () => api.post(`/signin`, credentials),
  ]);
};

export const signup = async (user: any) => {
  return tryRequests<any>([
    () => api.post(`${USERS_API}/signup`, user),
    () => api.post(`/users/signup`, user),
    () => api.post(`/signup`, user),
  ]);
};

export const profile = async () => {
  return tryRequests<any>([
    () => api.post(`${USERS_API}/profile`),
    () => api.get(`${USERS_API}/current`),
    () => api.get(`/users/current`),
    () => api.post(`/users/profile`),
  ]);
};

export const signout = async () => {
  return tryRequests<any>([
    () => api.post(`${USERS_API}/signout`),
    () => api.post(`/users/signout`),
    () => api.post(`/signout`),
  ]);
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
