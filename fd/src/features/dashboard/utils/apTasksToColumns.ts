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


function isInProgressEntry(entry: TicketHistory): boolean {
  return entry.state === 'inprogress';
}

function calculateEntryDuration(entry: TicketHistory, now: Date): number {
  const entered = DateTime.fromJSDate(entry.enteredAt).toLocal();
  const exited = entry.exitedAt
    ? DateTime.fromJSDate(entry.exitedAt).toLocal()
    : null;

  if (!entered.isValid) return 0;

  if (!exited || !exited.isValid) {
    return DateTime.fromJSDate(now).toLocal().diff(entered).toMillis();
  }

  return exited.diff(entered).toMillis();
}

export function calculateInProgressTime(
  history: TicketHistory[],
  now: Date = new Date()
): ProgressTimeResult {
  if (history.length === 0) {
    return {
      totalInProgressDuration: Duration.fromMillis(0),
    };
  }

  const totalMillis = history
    .filter(isInProgressEntry)
    .reduce((sum, entry) => sum + calculateEntryDuration(entry, now), 0);

  return {
    totalInProgressDuration: Duration.fromMillis(totalMillis),
  };
}


function createCSVHeaders(): string[] {
  return ['S.No', 'Title', 'Estimation (h)', 'Current Status', 'Reporter Name'];
}

function getSkipTitlesSet(): Set<string> {
  return new Set([
    'Daily Standup / Daily Sync',
    'Stakeholder, Ad-hoc and Internal Meetings',
  ].map(title => title.toLowerCase()));
}

function filterTickets(tickets: Ticket[], skipTitlesSet: Set<string>): Ticket[] {
  return tickets.filter(ticket => !skipTitlesSet.has(ticket.title.toLowerCase()));
}

function mapTicketsToRows(tickets: Ticket[]): (string | number)[][] {
  return tickets.map((ticket, index) => [
    index + 1,
    `"${ticket.title}"`,
    ticket.estimateTime,
    ticket.currentState,
    `"${ticket.reporter.name}"`,
  ]);
}

function createCSVContent(headers: string[], rows: (string | number)[][]): string {
  return [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
}

function triggerCSVDownload(csvContent: string): void {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `tickets_${new Date().toISOString()}.csv`;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function downloadTicketsAsCSV(tickets: Ticket[]): void {
  if (!tickets.length) return;

  if (!tickets.length) return;

  const headers = createCSVHeaders();
  const skipTitlesSet = getSkipTitlesSet();
  const filteredTickets = filterTickets(tickets, skipTitlesSet);
  const rows = mapTicketsToRows(filteredTickets);
  const csvContent = createCSVContent(headers, rows);

  triggerCSVDownload(csvContent);
}

