// Dashboard/Dashboard.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import DashboardUI from '@/features/dashboard/components/DashboardUI';
import { getAllUserQuery, useTasksQuery } from '../services/query';
import { useDashboard } from '../hooks/useDashboard';
import { Typography, Stack } from '@mui/material';
import { setSelectedUser, setUsers } from '../slice';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();

  const loggedInUser = useSelector((state: RootState) => state.login?.userDetails?.user);
  const selectedUser = useSelector((state: RootState) => state.users.selectedUser);

  const { data: usersList, isLoading: userLoading, isError: userError } = getAllUserQuery();
  const users = usersList?.data?.users

  const { data, isLoading, isError } = useTasksQuery(selectedUser?._id);
  const tickets = data?.data.tickets || [];
  const { columns, onDragEnd, onDragStart, draggingFrom } = useDashboard(tickets);

  useEffect(() => {
    if (users?.length) {
      dispatch(setUsers(users));
      if (loggedInUser) {
        dispatch(setSelectedUser(loggedInUser));
      }
    }
  }, [users, loggedInUser]);

  if (!selectedUser?._id) {
    return (
      <Stack mt="40vh" justifyContent="center" alignItems="center">
        <Typography variant="h6">Clues found. Assembling identities... 👥✨</Typography>
      </Stack>
    );
  }

  if (isLoading || userLoading)
    return (
      <Stack mt="40vh" justifyContent="center" alignItems="center">
        <Typography variant="h6">Hold tight! Your tasks are almost here... ⏳🎯</Typography>
      </Stack>
    );

  if (isError || userError)
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
