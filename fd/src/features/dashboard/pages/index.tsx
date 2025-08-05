// Dashboard/Dashboard.tsx
import React from 'react';
import DashboardUI from '../components/DashboardUI';
import { useDashboard } from '../hooks/useDashboard';
import { useTasksQuery } from '../services/dashboard.query';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';

const Dashboard: React.FC = () => {
    const Id = useSelector((state: RootState) => state.login?.userDetails?.user._id)

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
