import API_URL from "./api-url";
import { getAccessToken } from "./accessToken";

export const httpGetAllStudentAttendanceBySemesterNumber = async (
  semesterNumber
) => {
  const response = await fetch(
    `${API_URL}/student/attendance/${semesterNumber}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAccessToken()}`,
      },
    }
  );
  return await response.json();
};
