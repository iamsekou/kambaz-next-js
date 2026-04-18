import api from "../api";

const COURSES_API = `/api/courses`;
const USERS_API = `/api/users`;
const ASSIGNMENTS_API = `/api/assignments`;
const QUIZZES_API = `/api/quizzes`;
const ATTEMPTS_API = `/api/attempts`;

const toArray = <T>(value: unknown): T[] => {
  if (Array.isArray(value)) return value as T[];
  if (value && typeof value === "object") {
    const withItems = value as {
      items?: T[];
      quizzes?: T[];
      attempts?: T[];
      data?: T[];
    };
    return (
      withItems.items || withItems.quizzes || withItems.attempts || withItems.data || []
    );
  }
  return [];
};

const tryRequests = async <T>(
  requests: Array<() => Promise<{ data: T }>>
): Promise<T> => {
  let lastError: unknown;
  for (const request of requests) {
    try {
      const { data } = await request();
      return data;
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError;
};

export const fetchAllCourses = async () => {
  const { data } = await api.get(COURSES_API);
  return data;
};

export const findMyCourses = async () => {
  const { data } = await api.get(
    `${USERS_API}/current/courses`
  );
  return data;
};

export const createCourse = async (course: any) => {
  const { data } = await api.post(
    `${USERS_API}/current/courses`,
    course
  );
  return data;
};

export const deleteCourse = async (courseId: string) => {
  const { data } = await api.delete(`${COURSES_API}/${courseId}`);
  return data;
};

export const updateCourse = async (course: any) => {
  const { data } = await api.put(`${COURSES_API}/${course._id}`, course);
  return data;
};

export const findModulesForCourse = async (courseId: string) => {
  const response = await api.get(`${COURSES_API}/${courseId}/modules`);
  return response.data;
};

export const createModuleForCourse = async (courseId: string, module: any) => {
  const response = await api.post(
    `${COURSES_API}/${courseId}/modules`,
    module
  );
  return response.data;
};

export const deleteModule = async (courseId: string, moduleId: string) => {
  const response = await api.delete(
    `${COURSES_API}/${courseId}/modules/${moduleId}`
  );
  return response.data;
};

export const updateModule = async (courseId: string, module: any) => {
  const response = await api.put(
    `${COURSES_API}/${courseId}/modules/${module._id}`,
    module
  );
  return response.data;
};

export const findAssignmentsForCourse = async (courseId: string) => {
  const response = await api.get(`${COURSES_API}/${courseId}/assignments`);
  return response.data;
};

export const findQuizzesForCourse = async (courseId: string) => {
  const data = await tryRequests<any>([
    () => api.get(`${COURSES_API}/${courseId}/quizzes`),
    () => api.get(`${QUIZZES_API}?course=${courseId}`),
  ]);
  return toArray<any>(data);
};

export const findQuizById = async (quizId: string) => {
  const data = await tryRequests<any>([
    () => api.get(`${QUIZZES_API}/${quizId}`),
    () => api.get(`${QUIZZES_API}?id=${quizId}`),
  ]);

  if (Array.isArray(data)) return data[0] || null;
  if (data && typeof data === "object" && "quiz" in data) {
    return (data as { quiz: any }).quiz;
  }
  return data;
};

export const findMyAttemptsForQuiz = async (quizId: string) => {
  const data = await tryRequests<any>([
    () => api.get(`${QUIZZES_API}/${quizId}/attempts/current`),
    () => api.get(`${QUIZZES_API}/${quizId}/attempts?mine=true`),
    () => api.get(`${USERS_API}/current/quizzes/${quizId}/attempts`),
  ]);
  return toArray<any>(data);
};

export const findMyAttemptsForCourse = async (courseId: string) => {
  const data = await tryRequests<any>([
    () => api.get(`${COURSES_API}/${courseId}/quizzes/attempts/current`),
    () => api.get(`${USERS_API}/current/quizzes/attempts?course=${courseId}`),
  ]);
  return toArray<any>(data);
};

export const findAttemptById = async (attemptId: string) => {
  const data = await tryRequests<any>([
    () => api.get(`${ATTEMPTS_API}/${attemptId}`),
    () => api.get(`${QUIZZES_API}/attempts/${attemptId}`),
  ]);
  if (data && typeof data === "object" && "attempt" in data) {
    return (data as { attempt: any }).attempt;
  }
  return data;
};

export const startQuizAttempt = async (quizId: string) => {
  const data = await tryRequests<any>([
    () => api.post(`${QUIZZES_API}/${quizId}/attempts`, {}),
    () => api.post(`${QUIZZES_API}/${quizId}/attempts/start`, {}),
  ]);
  if (data && typeof data === "object" && "attempt" in data) {
    return (data as { attempt: any }).attempt;
  }
  return data;
};

export const submitQuizAttempt = async (
  quizId: string,
  attemptId: string,
  payload: { answers: Record<string, string>; score: number; pointsEarned: number }
) => {
  const data = await tryRequests<any>([
    () =>
      api.put(`${QUIZZES_API}/${quizId}/attempts/${attemptId}/submit`, payload),
    () => api.put(`${ATTEMPTS_API}/${attemptId}/submit`, payload),
    () => api.post(`${QUIZZES_API}/${quizId}/submissions`, { ...payload, attemptId }),
  ]);
  if (data && typeof data === "object" && "attempt" in data) {
    return (data as { attempt: any }).attempt;
  }
  return data;
};

export const findAssignmentById = async (assignmentId: string) => {
  const response = await api.get(`${ASSIGNMENTS_API}/${assignmentId}`);
  return response.data;
};

export const createAssignmentForCourse = async (
  courseId: string,
  assignment: any
) => {
  const response = await api.post(
    `${COURSES_API}/${courseId}/assignments`,
    assignment
  );
  return response.data;
};

export const deleteAssignment = async (assignmentId: string) => {
  const response = await api.delete(
    `${ASSIGNMENTS_API}/${assignmentId}`
  );
  return response.data;
};

export const updateAssignment = async (assignment: any) => {
  const response = await api.put(
    `${ASSIGNMENTS_API}/${assignment._id}`,
    assignment
  );
  return response.data;
};

export const findMyEnrollments = async () => {
  const { data } = await api.get(
    `${USERS_API}/current/enrollments`
  );
  return data;
};

export const findEnrollmentsForCourse = async (courseId: string) => {
  const { data } = await api.get(`${COURSES_API}/${courseId}/enrollments`);
  return data;
};


export const enrollInCourse = async (courseId: string) => {
  const { data } = await api.post(
    `${COURSES_API}/${courseId}/enroll`
  );
  return data;
};

export const unenrollFromCourse = async (courseId: string) => {
  const { data } = await api.delete(
    `${COURSES_API}/${courseId}/enroll`
  );
  return data;
};

export const enrollIntoCourse = async (userId: string, courseId: string) => {
  const response = await api.post(
    `${USERS_API}/${userId}/courses/${courseId}`
  );
  return response.data;
};

export const unenrollUserFromCourse = async (userId: string, courseId: string) => {
  const response = await api.delete(
    `${USERS_API}/${userId}/courses/${courseId}`
  );
  return response.data;
};

export const findUsersForCourse = async (courseId: string) => {
  const { data } = await api.get(`${COURSES_API}/${courseId}/users`);
  return data;
};

export const createUserForCourse = async (courseId: string, user: any) => {
  const { data } = await api.post(
    `${COURSES_API}/${courseId}/users`,
    user
  );
  return data;
};

export const updatePerson = async (user: any) => {
  const { data } = await api.put(
    `/api/people/${user._id}`,
    user
  );
  return data;
};

export const deletePerson = async (userId: string) => {
  const { data } = await api.delete(
    `/api/people/${userId}`
  );
  return data;
};
