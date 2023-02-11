import API_URL from "./api-url";

async function httpGetSubscriptionPackages() {
  const response = await fetch(`${API_URL}/packages`);
  return await response.json();
}

// Load teacher profile and return as JSON. //DEPRECATED
async function httpGetTeacherProfile() {
  const response = await fetch(`${API_URL}/teacher/profile`);
  return await response.json();
}

export { httpGetSubscriptionPackages, httpGetTeacherProfile };
