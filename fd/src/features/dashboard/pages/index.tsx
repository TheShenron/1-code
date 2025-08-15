// Dashboard/Dashboard.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import DashboardUI from '@/features/dashboard/components/DashboardUI';
import { useTasksQuery } from '../services/query';
import { useDashboard } from '../hooks/useDashboard';
import { Typography, Stack } from '@mui/material';

const Dashboard: React.FC = () => {
  const Id = useSelector((state: RootState) => state.login?.userDetails?.user._id);

  const { data, isLoading, isError } = useTasksQuery(Id);
  const tickets = data?.data.tickets || [];
  const { columns, onDragEnd, onDragStart, draggingFrom } = useDashboard(tickets);

  if (!Id) {
    return <div>Failed to fetch user_id form store.</div>;
  }

  if (isLoading)
    return (
      <Stack mt="40vh" justifyContent="center" alignItems="center">
        <Typography variant="h6">Hold tight! Your tasks are almost here... ⏳🎯</Typography>
      </Stack>
    );
  if (isError)
    return (
      <Stack mt="40vh" justifyContent="center" alignItems="center">
        <Typography variant="h6" color="error">
          Oops! Tasks went on a coffee break ☕️
        </Typography>
        <Typography variant="body1" mt={1}>
          Try refreshing or check your internet connection.
        </Typography>
      </Stack>
    );

  return (
    <DashboardUI
      columns={columns!}
      onDragEnd={onDragEnd}
      onDragStart={onDragStart}
      draggingFrom={draggingFrom}
    />
  );
};

export default Dashboard;
