// Dashboard/useDashboard.ts
import { useEffect, useState } from 'react';
import { mapTasksToColumns } from '../utils/apTasksToColumns';
import { DropResult } from '@hello-pangea/dnd';
import { ColumnMap, isValidTicketState, Ticket } from '../schema/tickect.schema';
import { useUpdateTicketStateMutation } from '../services/query';

type UseDashboardReturnType = {
  columns: ColumnMap | null;
  onDragEnd: (_result: DropResult) => void;
  onDragStart: (_start: { source: { droppableId: string } }) => void;
  draggingFrom: string | null;
};

export const useDashboard = (tasks: Ticket[]): UseDashboardReturnType => {
  const [columns, setColumns] = useState<ColumnMap | null>(null);
  const [draggingFrom, setDraggingFrom] = useState<string | null>(null);
  const { mutate } = useUpdateTicketStateMutation();

  useEffect(() => {
    if (tasks.length) {
      setColumns(mapTasksToColumns(tasks));
    }
  }, [tasks]);

  const onDragStart = (start: { source: { droppableId: string } }): void => {
    setDraggingFrom(start.source.droppableId);
  };

  const isSameColumn = (
    source: DropResult['source'],
    destination: DropResult['destination'] | null
  ): boolean => {
    if (!destination) return false;
    return source.droppableId === destination.droppableId;
  };
  const reorderWithinColumn = (
    columns: ColumnMap,
    source: DropResult['source'],
    destination: DropResult['destination']
  ): ColumnMap => {
    if (!isValidTicketState(source.droppableId)) throw new Error('Invalid source ID');
    if (!isValidTicketState(destination?.droppableId)) throw new Error('Invalid destination ID');

    const column = columns[source.droppableId];
    const copiedItems = [...column.tasks];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);

    return {
      ...columns,
      [source.droppableId]: {
        ...column,
        tasks: copiedItems,
      },
    };
  };

  const moveBetweenColumns = (
    columns: ColumnMap,
    source: DropResult['source'],
    destination: DropResult['destination']
  ): { updatedColumns: ColumnMap; movedTask: Ticket } => {
    if (!isValidTicketState(source.droppableId) || !isValidTicketState(destination?.droppableId)) {
      throw new Error('Invalid droppableId');
    }
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.tasks];
    const destItems = [...destColumn.tasks];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);

    const updatedColumns = {
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        tasks: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        tasks: destItems,
      },
    };

    return { updatedColumns, movedTask: removed };
  };

  const shouldIgnoreDrop = (sourceId: string, destinationId: string): boolean =>
    destinationId === 'open' && sourceId !== 'open';

  const onDragEnd = (result: DropResult): void => {
    if (!columns) return;

    if (!result.destination) return;

    const { source, destination } = result;

    setDraggingFrom(null);

    if (shouldIgnoreDrop(source.droppableId, destination.droppableId)) return;

    if (isSameColumn(source, destination)) {
      if (!isValidTicketState(source.droppableId)) return;

      const updated = reorderWithinColumn(columns, source, destination);
      setColumns(updated);
    } else {
      if (!isValidTicketState(source.droppableId) || !isValidTicketState(destination.droppableId))
        return;

      const { updatedColumns, movedTask } = moveBetweenColumns(columns, source, destination);
      setColumns(updatedColumns);

      if (isValidTicketState(destination.droppableId)) {
        mutate({
          id: movedTask._id,
          newState: destination.droppableId,
        });
      } else {
        console.warn('Invalid state:', destination.droppableId);
      }
    }
  };

  return { columns, onDragEnd, onDragStart, draggingFrom };
};
