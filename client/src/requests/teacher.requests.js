import API_URL from "./api-url";
import { getAccessToken } from "./accessToken";

export const httpGetTeacherEnrolledCourses = async () => {
  const response = await fetch(`${API_URL}/teacher/enroll-course`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
  return await response.json();
};

export const httpPostTeacherEnrolledCourses = async (courseCode, session) => {
  const response = await fetch(`${API_URL}/teacher/enroll-course`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAccessToken()}`,
    },
    body: JSON.stringify({
      courseCode,
      session,
    }),
  });
  return await response.json();
};

export const httpPostTakeStudentsAttendance = async (
  courseCode,
  session,
  attendanceData
) => {
  const response = await fetch(`${API_URL}/teacher/attendance`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAccessToken()}`,
    },
    body: JSON.stringify({
      courseCode,
      session,
      attendanceData,
    }),
  });
  return await response.json();
};

export const httpGetStudentsAttendanceByCourseCodeAndSession = async (
  courseCode,
  session,
  createdAt
) => {
  const url = createdAt
    ? `${API_URL}/teacher/attendance?courseCode=${courseCode}&session=${session}&createdAt=${createdAt}`
    : `${API_URL}/teacher/attendance?courseCode=${courseCode}&session=${session}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
  return await response.json();
};

export const httpGetCourseClasses = async (courseCode, session) => {
  const response = await fetch(
    `${API_URL}/teacher/course-class?courseCode=${courseCode}&session=${session}`,
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
