import React from 'react';
import { Typography } from '@mui/material';
import { useLiveTimer } from '../hooks/useLiveTimer';
import { TicketState } from '../types/task.types';

interface TimerDisplayProps {
    estimateTime: number;
    timeSpentInProgress: number;
    currentState: TicketState;
    inProgressStartedAt: Date
}

export const TimerDisplay: React.FC<TimerDisplayProps> = React.memo(
    ({ estimateTime, timeSpentInProgress, currentState }) => {
        const isInProgress = currentState === 'inprogress';
        const liveTime = useLiveTimer(timeSpentInProgress ?? 0, isInProgress);

        return (
            <Typography variant="caption" color="text.secondary">
                Est: {estimateTime}h | Spent: {liveTime}
            </Typography>
        );
    }
);
