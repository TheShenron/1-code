import React from 'react';
import { TicketForm } from './TicketForm';
import { useDeleteTicketMutation, useUpdateTicketMutation } from '../services/query';
import { RootState } from '@/app/store';
import { useSelector } from 'react-redux';
import { Ticket, UpdateTicket } from '../schema/tickect.schema';



interface UpdateTicketDialogContainerProps {
  open: boolean,
  handleClose: () => void,
  initialData: Ticket
}

export const UpdateTicketDialogContainer: React.FC<UpdateTicketDialogContainerProps> = ({ handleClose, initialData, open }) => {
  const user = useSelector((state: RootState) => state.login?.userDetails?.user);
  const { mutateAsync: updateMutateAsync } = useUpdateTicketMutation();
  const { mutateAsync: deleteMutateAsync } = useDeleteTicketMutation();

  const handleSubmit = async(data: UpdateTicket): Promise<void> => {
    try {
      await updateMutateAsync({ id: data.id, data });
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async(id: string): Promise<void> => {
    try {
      await deleteMutateAsync({ id });
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  if (!user) return 'Logined ID Not Found...';

  return (
    <TicketForm
      open={open}
      onClose={handleClose}
      onSubmit={handleSubmit}
      onDelete={handleDelete}
      reporter={[user]}
      mode='update'
      initialData={initialData}
    />
  );
};
