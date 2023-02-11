const API_URL = "http://localhost:8000";

//DEPRECATED

// courses
async function httpGetTeacherCourses(teacherId) {
  const response = await fetch(`${API_URL}/teacher/courses/${teacherId}`);
  return await response.json();
}

// course students list
async function httpsGetStudentsListOfCourse(courseId) {
  const response = await fetch(`${API_URL}/teacher/students/${courseId}`);
  return await response.json();
}

export { httpGetTeacherCourses, httpsGetStudentsListOfCourse };
