import React, { useState } from 'react';
import { Button, Stack } from '@mui/material';
import { useCreateTicketMutation, useSnapshotMutation, useTasksMutation } from '../services/query';
import { RootState } from '@/app/store';
import { useSelector } from 'react-redux';
import { CreateTicket } from '../schema/tickect.schema';
import { downloadTicketsAsCSV } from '../utils/apTasksToColumns';
import TicketForm from './TicketForm';
import { toast } from 'react-toastify';

export const CreateTicketDialogContainer: React.FC = () => {
  const user = useSelector((state: RootState) => state.login?.userDetails?.user);
  const [open, setOpen] = useState(false);
  const { mutateAsync } = useCreateTicketMutation();
  const { mutateAsync: getTaskMutation } = useTasksMutation();
  const { mutateAsync: snapShotMutation } = useSnapshotMutation();

  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);

  const handleSubmit = async (data: CreateTicket): Promise<void> => {
    try {
      await mutateAsync(data);
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleExportData = async (): Promise<void> => {
    try {
      if (!user?._id) return;
      const data = await getTaskMutation(user?._id);
      const ticket = data.data.tickets;
      downloadTicketsAsCSV(ticket);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSnapShot = async (): Promise<void> => {
    try {
      if (!user?._id) return;
      const data = await getTaskMutation(user?._id);
      const ticket = data.data.tickets;
      const { message } = await snapShotMutation({
        userId: user?._id,
        ticketIds: ticket.map(item => item._id),
      });
      toast.success(message);
    } catch (error) {
      console.error(error);
    }
  };

  if (!user) return 'Logined ID Not Found...';

  return (
    <>
      <Stack direction="row" gap={2}>
        <Button variant="outlined" color="warning" onClick={handleSnapShot}>
          SnapShot
        </Button>
        <Button variant="outlined" color="success" onClick={handleExportData}>
          Export Data
        </Button>
        <Button variant="contained" onClick={handleOpen}>
          Create Ticket
        </Button>
      </Stack>
      {open && (
        <TicketForm
          open={open}
          onClose={handleClose}
          onSubmit={handleSubmit}
          reporter={[user]}
          mode="create"
        />
      )}
    </>
  );
};
