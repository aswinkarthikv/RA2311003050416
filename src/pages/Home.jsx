import React, { useEffect, useState } from "react";
import { Container, Typography, Tabs, Tab, Box, CircularProgress } from '@mui/material';
import { Log } from "../utils/logger";
import { fetchApi } from "../services/api";
import NotificationCard from "../components/NotificationCard";

function Home() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // 'all' represents no filter. We can filter by 'error', 'warning', 'info'
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      Log("info", "Loading notifications dashboard", "page");
      setLoading(true);

      const data = await fetchApi('/notifications');
      
      if (data && data.notifications) {
        setNotifications(data.notifications);
        Log("info", `Fetched ${data.notifications.length} notifications successfully`, "api");
      }
    } catch (err) {
      Log("error", "Failed to fetch notifications from the server", "api");
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    Log("info", `User switched to tab: ${newValue}`, "component");
    setActiveTab(newValue);
  };

  // Derive the displayed notifications based on the active tab
  const displayedNotifications = activeTab === "all" 
    ? notifications 
    : notifications.filter(n => n.type === activeTab);

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" color="primary">
        Campus Notifications
      </Typography>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange} 
          aria-label="notification severity tabs"
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="All Notifications" value="all" />
          <Tab label="Errors" value="error" />
          <Tab label="Warnings" value="warning" />
          <Tab label="Info" value="info" />
        </Tabs>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          {displayedNotifications.length > 0 ? (
            displayedNotifications.map((notification, idx) => (
              <NotificationCard key={idx} notification={notification} />
            ))
          ) : (
            <Typography variant="body1" color="textSecondary" align="center" sx={{ mt: 4 }}>
              No notifications found for this category.
            </Typography>
          )}
        </Box>
      )}
    </Container>
  );
}

export default Home;
