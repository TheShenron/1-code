// Dashboard/useDashboard.ts
import { useEffect, useState } from 'react';
import { Columns, Task } from '../types/task.types';
import { mapTasksToColumns } from '../utils/apTasksToColumns';
import { DropResult } from '@hello-pangea/dnd';

export const useDashboard = (tasks: Task[]) => {
    const [columns, setColumns] = useState<Columns>({});
    const [draggingFrom, setDraggingFrom] = useState<string | null>(null);

    useEffect(() => {
        if (tasks.length) {
            setColumns(mapTasksToColumns(tasks));
        }
    }, [tasks]);

    const onDragStart = (start: { source: { droppableId: string } }) => {
        setDraggingFrom(start.source.droppableId);
    };

    const onDragEnd = (result: DropResult) => {
        setDraggingFrom(null);
        const { source, destination } = result;

        if (!destination) return;

        if (destination.droppableId === 'open' && source.droppableId !== 'open') return;

        if (source.droppableId === destination.droppableId) {
            const column = columns[source.droppableId];
            const copiedItems = [...column.items];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);

            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...column,
                    items: copiedItems,
                },
            });
        } else {
            const sourceColumn = columns[source.droppableId];
            const destColumn = columns[destination.droppableId];
            const sourceItems = [...sourceColumn.items];
            const destItems = [...destColumn.items];
            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, removed);

            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems,
                },
                [destination.droppableId]: {
                    ...destColumn,
                    items: destItems,
                },
            });
        }
    };

    return { columns, onDragEnd, onDragStart, draggingFrom };
};
