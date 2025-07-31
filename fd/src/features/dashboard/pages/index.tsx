// import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
// import { Box, Stack } from '@mui/material';
// import { useState } from 'react'

// // Initial data
// const initialData = {
//     columns: {
//         open: {
//             name: 'Open',
//             items: [
//                 { id: '1', content: 'Fix login bug' },
//                 { id: '2', content: 'Write unit tests' },
//                 { id: '3', content: 'Fix login bug' },
//                 { id: '4', content: 'Write unit tests' },
//                 { id: '5', content: 'Fix login bug' },
//                 { id: '6', content: 'Write unit tests' },
//                 { id: '7', content: 'Fix login bug' },
//                 { id: '8', content: 'Write unit tests' },
//                 { id: '9', content: 'Fix login bug' },
//                 { id: '10', content: 'Write unit tests' },
//             ],
//         },
//         inprogress: {
//             name: 'In Progress',
//             items: [],
//         },
//         inpending: {
//             name: 'In Pending',
//             items: [],
//         },
//         blocked: {
//             name: 'Blocked',
//             items: [],
//         },
//         done: {
//             name: 'Done',
//             items: [],
//         },
//     },
// };

// const Dashboard = () => {

//     const [columns, setColumns] = useState(initialData.columns);
//     const [draggingFrom, setDraggingFrom] = useState(null);

//     const onDragStart = (start) => {
//         setDraggingFrom(start.source.droppableId);
//     };

//     const onDragEnd = (result) => {
//         setDraggingFrom(null);
//         const { source, destination } = result;

//         // dropped outside a droppable
//         if (!destination) return;

//         if (
//             destination.droppableId === 'open' &&
//             source.droppableId !== 'open'
//         ) {
//             // alert('You cannot move a ticket back to Open once it has progressed.');
//             return;
//         }

//         // If dropped in the same column
//         if (source.droppableId === destination.droppableId) {
//             const column = columns[source.droppableId];
//             const copiedItems = [...column.items];
//             const [removed] = copiedItems.splice(source.index, 1);
//             copiedItems.splice(destination.index, 0, removed);

//             setColumns({
//                 ...columns,
//                 [source.droppableId]: {
//                     ...column,
//                     items: copiedItems,
//                 },
//             });
//         } else {
//             // Moving between columns
//             const sourceColumn = columns[source.droppableId];
//             const destColumn = columns[destination.droppableId];
//             const sourceItems = [...sourceColumn.items];
//             const destItems = [...destColumn.items];
//             const [removed] = sourceItems.splice(source.index, 1);
//             destItems.splice(destination.index, 0, removed);

//             setColumns({
//                 ...columns,
//                 [source.droppableId]: {
//                     ...sourceColumn,
//                     items: sourceItems,
//                 },
//                 [destination.droppableId]: {
//                     ...destColumn,
//                     items: destItems,
//                 },
//             });
//         }
//     };

//     return (
//         <div>
//             <h1>Dashboard</h1>

//             <Stack direction='row' overflow='auto' justifyContent='center'>
//                 <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
//                     {Object.entries(columns).map(([columnId, column]) => (
//                         <Box key={columnId} mx={1}>
//                             <h3>{column.name}</h3>
//                             <Droppable droppableId={columnId} isDropDisabled={
//                                 columnId === 'open' && draggingFrom !== 'open'
//                             }>
//                                 {(provided, snapshot) => (
//                                     <Box
//                                         {...provided.droppableProps}
//                                         ref={provided.innerRef}
//                                         p={1}
//                                         bgcolor={snapshot.isDraggingOver ? '#e0f7fa' : '#f0f0f0'}
//                                         height={500}
//                                         borderRadius={1}
//                                         width={240}
//                                         overflow='auto'

//                                     >
//                                         {column.items.map((item, index) => (
//                                             <Draggable
//                                                 key={item.id}
//                                                 draggableId={item.id}
//                                                 index={index}
//                                             >
//                                                 {(provided, snapshot) => (
//                                                     <div
//                                                         ref={provided.innerRef}
//                                                         {...provided.draggableProps}
//                                                         {...provided.dragHandleProps}
//                                                         style={{
//                                                             userSelect: 'none',
//                                                             padding: 16,
//                                                             margin: '0 0 8px 0',
//                                                             minHeight: '50px',
//                                                             backgroundColor: snapshot.isDragging
//                                                                 ? '#bbdefb'
//                                                                 : '#ffffff',
//                                                             color: '#333',
//                                                             border: '1px solid #ccc',
//                                                             borderRadius: 4,
//                                                             ...provided.draggableProps.style,
//                                                         }}
//                                                     >
//                                                         {item.content}
//                                                     </div>
//                                                 )}
//                                             </Draggable>
//                                         ))}
//                                         {provided.placeholder}
//                                     </Box>
//                                 )}
//                             </Droppable>
//                         </Box>
//                     ))}
//                 </DragDropContext>
//             </Stack>

//         </div>
//     )
// }

// export default Dashboard


// Dashboard/Dashboard.tsx
import React from 'react';
import DashboardUI from '../components/DashboardUI';
import { useDashboard } from '../hooks/useDashboard';
import { useTasksQuery } from '../services/dashboard.query';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';

const Dashboard: React.FC = () => {
    const Id = useSelector((state: RootState) => state.login?.userDetails?._id)

    if (!Id) {
        return <div>Please log in to see your tasks.</div>;
    }

    const { data: tasks = [], isLoading, isError } = useTasksQuery(Id);
    const { columns, onDragEnd, onDragStart, draggingFrom } = useDashboard(tasks);

    if (isLoading) return <div>Loading tasks...</div>;
    if (isError) return <div>Failed to load tasks</div>;

    return (
        <DashboardUI
            columns={columns}
            onDragEnd={onDragEnd}
            onDragStart={onDragStart}
            draggingFrom={draggingFrom}
        />
    );
};

export default Dashboard;
