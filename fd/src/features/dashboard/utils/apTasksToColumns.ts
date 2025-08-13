// Dashboard/utils/mapTasksToColumns.ts
import { ColumnMap, ProgressTimeResult, Ticket, TicketHistory } from '../schema/tickect.schema';
import { DateTime, Duration } from 'luxon';

export const mapTasksToColumns = (tasks: Ticket[]): ColumnMap => {
  const columns: ColumnMap = {
    open: { name: 'Open', tasks: [] },
    inprogress: { name: 'In Progress', tasks: [] },
    inpending: { name: 'In Pending', tasks: [] },
    blocked: { name: 'Blocked', tasks: [] },
    qa_review: { name: 'QA Review', tasks: [] },
  };

  tasks.forEach((task) => {

    if (columns[task.currentState]) {
      columns[task.currentState].tasks.push(task);
    }
  });

  return columns;
};

export function calculateInProgressTime(
  history: TicketHistory[],
  now: Date = new Date()
): ProgressTimeResult {
  if (history.length === 0) {
    return {
      totalInProgressDuration: Duration.fromMillis(0),
    };
  }

  let totalMillis = 0;

  for (const entry of history) {
    if (entry.state === 'inprogress') {
      const entered = DateTime.fromJSDate(entry.enteredAt).toLocal();
      const exited = entry.exitedAt
        ? DateTime.fromJSDate(entry.exitedAt).toLocal()
        : null;

      if (!entered.isValid) continue;

      if (!exited || !exited.isValid) {
        // Still in progress, use current time
        totalMillis += DateTime.fromJSDate(now).toLocal().diff(entered).toMillis();
      } else {
        totalMillis += exited.diff(entered).toMillis();
      }
    }
  }

  return {
    totalInProgressDuration: Duration.fromMillis(totalMillis),
  };
}

export function downloadTicketsAsCSV(tickets: Ticket[]): void {
  if (!tickets.length) return;

  const headers = ['S.No', 'Title', 'Estimation (h)', 'Current Status', 'Reporter Name'];

  const skipTitlesSet = new Set([
    'Daily Standup / Daily Sync',
    'Stakeholder, Ad-hoc and Internal Meetings'
  ].map(title => title.toLowerCase()));

  const rows = tickets
    .filter(ticket => !skipTitlesSet.has(ticket.title.toLowerCase()))
    .map((ticket, index) => [
      index + 1,
      `"${ticket.title}"`,
      ticket.estimateTime,
      ticket.currentState,
      `"${ticket.reporter.name}"`,
    ]);

  const csvContent = [
    headers.join(','),
    ...rows.map((row) => row.join(',')),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `tickets_${new Date().toISOString()}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

