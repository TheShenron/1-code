// Dashboard/DashboardUI.tsx
import React from 'react';
import {
    DragDropContext,
    Droppable,
    Draggable
} from '@hello-pangea/dnd';
import {
    Box,
    Stack,
    Typography,
    Avatar
} from '@mui/material';
import { Columns } from '../types/task.types';

interface DashboardUIProps {
    columns: Columns;
    draggingFrom: string | null;
    onDragStart: (start: { source: { droppableId: string } }) => void;
    onDragEnd: (result: any) => void;
}

const DashboardUI: React.FC<DashboardUIProps> = ({
    columns,
    onDragStart,
    onDragEnd,
    draggingFrom
}) => {
    return (
        <Box p={2}>
            <Typography variant="h4" mb={2}>Dashboard</Typography>
            <Stack direction="row" overflow="auto" spacing={2}>
                <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
                    {Object.entries(columns).map(([columnId, column]) => (
                        <Box key={columnId} minWidth={260}>
                            <Typography variant="h6">{column.name}</Typography>
                            <Droppable
                                droppableId={columnId}
                                isDropDisabled={columnId === 'open' && draggingFrom !== 'open'}
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
                                        {column.items.map((item, index) => (
                                            <Draggable key={item.id} draggableId={item.id} index={index}>
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
                                                    >
                                                        <Typography fontWeight="bold">{item.title}</Typography>
                                                        <Box display="flex" alignItems="center" mt={1}>
                                                            <Avatar
                                                                src={item.reporter?.avatar}
                                                                sx={{ width: 24, height: 24, mr: 1 }}
                                                            >
                                                                {item.reporter?.name?.[0]}
                                                            </Avatar>
                                                            <Typography variant="body2">
                                                                {item.reporter?.name}
                                                            </Typography>
                                                        </Box>
                                                        <Typography variant="caption" color="text.secondary">
                                                            Est: {item.estimateTime}h | Spent: {item.timeSpentInProgress}h
                                                        </Typography>
                                                    </Box>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </Box>
                                )}
                            </Droppable>
                        </Box>
                    ))}
                </DragDropContext>
            </Stack>
        </Box>
    );
};

export default DashboardUI;
