import React from 'react';
import { Card, CardContent, Typography, Alert } from '@mui/material';

const NotificationCard = ({ notification }) => {
  const { title, type, message } = notification;

  // Map backend types to MUI Alert severities
  const severityMap = {
    error: 'error',
    warning: 'warning',
    info: 'info',
    success: 'success',
  };

  const severity = severityMap[type] || 'info';

  return (
    <Card sx={{ marginBottom: 2, boxShadow: 2 }}>
      <Alert severity={severity}>
        <Typography variant="subtitle1" fontWeight="bold">
          {title}
        </Typography>
        <Typography variant="body2">{message}</Typography>
      </Alert>
    </Card>
  );
};

export default NotificationCard;
