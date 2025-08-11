import { calculateInProgressTime } from '../utils/apTasksToColumns';
import { TicketHistory } from '../schema/tickect.schema';

const TimeDisplay = ({ history }: { history: TicketHistory[] }) => {
    const { totalInProgressDuration } =
        calculateInProgressTime(history, new Date());

    return (
        <>{totalInProgressDuration.as('hours').toFixed(2)}</>
    );
};

export default TimeDisplay;
