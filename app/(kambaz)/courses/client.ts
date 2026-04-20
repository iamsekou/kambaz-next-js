import api from "../api";

const COURSES_API = `/api/courses`;
const USERS_API = `/api/users`;
const ASSIGNMENTS_API = `/api/assignments`;
const QUIZZES_API = `/api/quizzes`;
const QUESTIONS_API = `/api/questions`;

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
  const { data } = await api.get(`${COURSES_API}/${courseId}/quizzes`);
  return data;
};

export const findQuizById = async (quizId: string) => {
  const { data } = await api.get(`${QUIZZES_API}/${quizId}`);
  return data;
};

export const createQuizForCourse = async (courseId: string, quiz: any) => {
  const { data } = await api.post(`${COURSES_API}/${courseId}/quizzes`, quiz);
  return data;
};

export const updateQuiz = async (quizId: string, updates: any) => {
  const { data } = await api.put(`${QUIZZES_API}/${quizId}`, updates);
  return data;
};

export const deleteQuiz = async (quizId: string) => {
  const { data } = await api.delete(`${QUIZZES_API}/${quizId}`);
  return data;
};

export const publishQuiz = async (quizId: string, published: boolean) => {
  const { data } = await api.put(`${QUIZZES_API}/${quizId}/publish`, {
    published,
  });
  return data;
};

export const findQuestionsForQuiz = async (quizId: string) => {
  const { data } = await api.get(`${QUIZZES_API}/${quizId}/questions`);
  return data;
};

export const createQuestionForQuiz = async (quizId: string, question: any) => {
  const { data } = await api.post(
    `${QUIZZES_API}/${quizId}/questions`,
    question
  );
  return data;
};

export const updateQuestion = async (questionId: string, updates: any) => {
  const { data } = await api.put(`${QUESTIONS_API}/${questionId}`, updates);
  return data;
};

export const deleteQuestion = async (questionId: string) => {
  const { data } = await api.delete(`${QUESTIONS_API}/${questionId}`);
  return data;
};

export const findAttemptsForQuiz = async (quizId: string) => {
  const { data } = await api.get(`${QUIZZES_API}/${quizId}/attempts`);
  return data;
};

export const findLastAttempt = async (quizId: string) => {
  const { data } = await api.get(`${QUIZZES_API}/${quizId}/attempts/last`);
  return data;
};

export const submitQuizAttempt = async (
  quizId: string,
  answers: Array<{ questionId: string; answer: string }>
) => {
  const { data } = await api.post(`${QUIZZES_API}/${quizId}/attempts`, {
    answers,
  });
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
