import api from "../../../shared/api/axios";

import type { StudentProfile } from "../types/studentProfile";

export const getStudentProfile = async (): Promise<StudentProfile> => {
  const response = await api.get<StudentProfile>("/students/profile/");

  return response.data;
};
