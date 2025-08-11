// Dashboard/useDashboard.ts
import { useEffect, useState } from 'react';
import { mapTasksToColumns } from '../utils/apTasksToColumns';
import { DropResult } from '@hello-pangea/dnd';
import { ColumnMap, isValidTicketState, Ticket } from '../schema/tickect.schema';
import { useUpdateTicketStateMutation } from '../services/query';

export const useDashboard = (tasks: Ticket[]) => {
    const [columns, setColumns] = useState<ColumnMap | null>(null);
    const [draggingFrom, setDraggingFrom] = useState<string | null>(null);
    const { mutate } = useUpdateTicketStateMutation()

    useEffect(() => {
        if (tasks.length) {
            setColumns(mapTasksToColumns(tasks));
        }
    }, [tasks]);

    const onDragStart = (start: { source: { droppableId: string } }) => {
        setDraggingFrom(start.source.droppableId);
    };

    const onDragEnd = (result: DropResult) => {

        if (!columns) return

        setDraggingFrom(null);
        const { source, destination } = result;

        if (!destination) return;

        if (destination.droppableId === 'open' && source.droppableId !== 'open') return;

        if (source.droppableId === destination.droppableId) {
            const column = columns[source.droppableId];
            const copiedItems = [...column.tasks];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);

            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...column,
                    tasks: copiedItems,
                },
            });
        } else {
            const sourceColumn = columns[source.droppableId];
            const destColumn = columns[destination.droppableId];
            const sourceItems = [...sourceColumn.tasks];
            const destItems = [...destColumn.tasks];
            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, removed);

            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    tasks: sourceItems,
                },
                [destination.droppableId]: {
                    ...destColumn,
                    tasks: destItems,
                },
            });

            if (isValidTicketState(destination.droppableId)) {
                mutate({
                    id: removed._id, newState: destination.droppableId,
                });
            } else {
                console.warn('Invalid state:', destination.droppableId);
            }

        }
    };

    return { columns, onDragEnd, onDragStart, draggingFrom };
};
