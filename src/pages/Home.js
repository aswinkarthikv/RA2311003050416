import { useEffect, useState } from "react";
import { Log } from "../utils/logger";

function Home() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      Log("info", "loading notifications", "api");

      const res = await fetch(
        "http://20.207.122.201/evaluation-service/notifications",
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkaWVuY2UiOiJodHRwOi8vMjAuMjA3LjEyMi4yMDEvZXZhbHVhdGlvbi1zZXJ2aWNlIiwicm9sZXMiOlsiVXNlciJdLCJuYW1lIjoiYXN3aW4ga2FydGhpayB2aWpheWFrdW1hciIsInJvbGxObyI6InJhMjMxMTAwMzA1MDQxNiIsImVtYWlsIjoiYXY4MjQzQHNybWlzdC5lZHUuaW4iLCJjbGllbnRJRCI6IjUwMGFkOTZkLTk0MGQtNDg3ZC04NzcwLTlhNTU1NThlZTU4IiwiY2xpZW50U2VjcmV0IjoidlNTdHZjbkduWEpaRUZhYSIsImFjY2Vzc0NvZGUiOiJRa2JweEgifSwiaWF0IjoxNzI3NDU2MDE5LCJleHAiOjE3MzAwNDgwMTl9.DhkRwrv4E2H5xBmn1HwfCu5RlA2OmduV9on0Vziver0`
          }
        }
      );

      const data = await res.json();

      // only top 10
      setNotifications(data.notifications.slice(0, 10));

    } catch (err) {
      Log("error", "failed to fetch notifications", "api");
    }
  };

  const filterByType = (type) => {
    Log("info", `filter applied: ${type}`, "component");

    const filtered = notifications.filter(n => n.type === type);
    setNotifications(filtered);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Notifications</h2>

      <button onClick={() => filterByType("error")}>Error</button>
      <button onClick={() => filterByType("warning")}>Warning</button>
      <button onClick={() => filterByType("info")}>Info</button>

      {notifications.map((n, i) => (
        <div key={i} style={{ marginBottom: 10 }}>
          <b>{n.title}</b>
          <div>{n.message}</div>
        </div>
      ))}
    </div>
  );
}

export default Home;
