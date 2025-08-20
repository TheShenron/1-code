import React from 'react';
import { Avatar, AvatarGroup, Stack, Tooltip, Typography } from '@mui/material';
import { RootState } from '@/app/store';
import { useDispatch, useSelector } from 'react-redux';
import { User } from '../schema/users.schema';
import { setSelectedUser } from '../slice';

const avatarColors = [
  '#F44336', '#E91E63', '#9C27B0',
  '#3F51B5', '#03A9F4', '#009688',
  '#4CAF50', '#FF9800', '#795548',
  '#607D8B',
];

export const TeamMembersAvatarGroup: React.FC = () => {
  const dispatch = useDispatch();

  const { users } = useSelector((state: RootState) => state.users);

  const getInitials = (name: string) => {
    return name[0]?.toUpperCase();
  };

  const handleSelect = (user: User) => {
    dispatch(setSelectedUser(user));
  };

  const getAvatarColor = (name: string) => {
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return avatarColors[hash % avatarColors.length];
  };

  if (!users || !users?.length) {
    return (

      <Stack mt="40vh" justifyContent="center" alignItems="center">
        <Typography variant="h6">We hit a glitch in the matrix. Give it a refresh or check your connection.</Typography>
      </Stack>
    )
  }

  return (
    <Stack spacing={2}>
      <AvatarGroup max={5}>
        {users.map((member) => (
          <Tooltip title={member.name} placement='top'>
            <Avatar
              key={member._id}
              alt={member.name}
              onClick={() => handleSelect(member)}
              sx={{
                bgcolor: getAvatarColor(member.name),
                cursor: 'pointer',
              }}
            >
              {getInitials(member.name)}
            </Avatar>
          </Tooltip>
        ))}
      </AvatarGroup>
    </Stack>
  );
};
