// Dashboard/DashboardUI.tsx
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { Box, Stack, Typography, Avatar } from '@mui/material';
import { ColumnMap, Ticket } from '../schema/tickect.schema';
import { CreateTicketDialogContainer } from './CreateTicketDialogContainer';
import { UpdateTicketDialogContainer } from './UpdateTicketDialogContainer';
import TimeDisplay from './TimerDisplay';
import { RootState } from '@/app/store';
import { useSelector } from 'react-redux';
import { TeamMembersAvatarGroup } from './TeamMembersAvatarGroup';

interface DashboardUIProps {
  columns: ColumnMap;
  draggingFrom: string | null;
  onDragStart: (_start: { source: { droppableId: string } }) => void;
  onDragEnd: (_result: DropResult<string>) => void;
}

const DashboardUI: React.FC<DashboardUIProps> = ({
  columns,
  onDragStart,
  onDragEnd,
  draggingFrom,
}) => {
  const [open, setOpen] = useState(false);
  const [initialData, setInitialData] = useState<Ticket | null>(null);
  const userDetails = useSelector((state: RootState) => state.login?.userDetails?.user);

  const handleOpen = (data: Ticket): void => {
    setInitialData(data);
    setOpen(true);
  };
  const handleClose = (): void => {
    setInitialData(null);
    setOpen(false);
  };

  return (
    <Box p={2}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="h4" pb={1} textTransform="capitalize">
            Hi {userDetails?.name}
          </Typography>
          <Typography>Time to build something cool. Let’s make it count today! 🚀</Typography>
        </Box>
        <CreateTicketDialogContainer />
      </Stack>
      <Stack py={2}>
        <TeamMembersAvatarGroup />
      </Stack>
      {Object.keys(columns ?? {}).length > 0 && (
        <Stack direction="row" overflow="auto" spacing={2}>
          <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
            {Object.entries(columns).map(([columnId, column]) => (
              <Box key={columnId} minWidth={260} width={260}>
                <Typography variant="h6">{column.name}</Typography>
                <Droppable
                  droppableId={columnId}
                  isDropDisabled={
                    (columnId === 'open' && draggingFrom !== 'open') ||
                    (columnId === 'inprogress' &&
                      columns['inprogress'].tasks.length >= 1 &&
                      draggingFrom !== 'inprogress')
                  }
                >
                  {(provided, snapshot) => (
                    <Box
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      bgcolor={snapshot.isDraggingOver ? '#e3f2fd' : '#f5f5f5'}
                      p={2}
                      borderRadius={2}
                      minHeight={500}
                    >
                      {column.tasks.map((item, index) => {
                        return (
                          <Draggable key={item._id} draggableId={item._id} index={index}>
                            {(provided, snapshot) => (
                              <Box
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                bgcolor={snapshot.isDragging ? '#bbdefb' : '#fff'}
                                border="1px solid #ccc"
                                borderRadius={2}
                                p={2}
                                mb={1}
                                boxShadow={snapshot.isDragging ? 2 : 0}
                                onClick={() => handleOpen(item)}
                              >
                                <Typography fontWeight="bold">{item.title}</Typography>

                                <Box>
                                  <Typography variant="body2" py={1}>
                                    Time Used:{' '}
                                    <TimeDisplay history={item.statusHistory} key={item._id} />h /{' '}
                                    {item.estimateTime}h
                                  </Typography>
                                </Box>

                                <Box display="flex" alignItems="center">
                                  <Avatar
                                    sx={{
                                      width: 25,
                                      height: 25,
                                      mr: 1,
                                      textTransform: 'capitalize',
                                    }}
                                  >
                                    {item.reporter?.name?.[0]}
                                  </Avatar>
                                  <Typography variant="body1" textTransform="capitalize">
                                    {item.reporter?.name}
                                  </Typography>
                                </Box>
                              </Box>
                            )}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </Box>
                  )}
                </Droppable>
              </Box>
            ))}
          </DragDropContext>
        </Stack>
      )}

      {open && initialData && (
        <UpdateTicketDialogContainer
          open={open}
          handleClose={handleClose}
          initialData={initialData}
        />
      )}
    </Box>
  );
};

export default DashboardUI;
