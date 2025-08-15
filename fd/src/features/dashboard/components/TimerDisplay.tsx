import { calculateInProgressTime } from '../utils/apTasksToColumns';
import { TicketHistory } from '../schema/tickect.schema';

const DECIMAL_PLACES = 2;

const TimeDisplay: React.FC<{ history: TicketHistory[] }> = ({ history }) => {
  const { totalInProgressDuration } = calculateInProgressTime(history, new Date());

  return <>{totalInProgressDuration.as('hours').toFixed(DECIMAL_PLACES)}</>;
};

export default TimeDisplay;
