import api from "../../../shared/api/axios";

import type { StudentProfile } from "../types/studentProfile";

export const getStudentProfile = async (): Promise<StudentProfile> => {
  const response = await api.get<StudentProfile>("/students/profile/");

  return response.data;
};

export const updateStudentProfile = async (
  data: Partial<StudentProfile>,
): Promise<StudentProfile> => {
  const response = await api.patch<StudentProfile>("/students/profile/", data);

  return response.data;
};
