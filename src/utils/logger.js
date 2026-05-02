export const Log = async (level, message, pkg = "component") => {
  try {
    await fetch("http://20.207.122.201/evaluation-service/logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkaWVuY2UiOiJodHRwOi8vMjAuMjA3LjEyMi4yMDEvZXZhbHVhdGlvbi1zZXJ2aWNlIiwicm9sZXMiOlsiVXNlciJdLCJuYW1lIjoiYXN3aW4ga2FydGhpayB2aWpheWFrdW1hciIsInJvbGxObyI6InJhMjMxMTAwMzA1MDQxNiIsImVtYWlsIjoiYXY4MjQzQHNybWlzdC5lZHUuaW4iLCJjbGllbnRJRCI6IjUwMGFkOTZkLTk0MGQtNDg3ZC04NzcwLTlhNTU1NThlZTU4IiwiY2xpZW50U2VjcmV0IjoidlNTdHZjbkduWEpaRUZhYSIsImFjY2Vzc0NvZGUiOiJRa2JweEgifSwiaWF0IjoxNzI3NDU2MDE5LCJleHAiOjE3MzAwNDgwMTl9.DhkRwrv4E2H5xBmn1HwfCu5RlA2OmduV9on0Vziver0`
      },
      body: JSON.stringify({
        stack: "frontend",
        level,
        package: pkg,
        message
      })
    });
  } catch (err) {
    console.error("log error", err);
  }
};
