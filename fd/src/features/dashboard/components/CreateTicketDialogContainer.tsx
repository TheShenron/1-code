import React, { useState } from 'react';
import { CreateTicketForm } from './CreateTicketForm';
import { useCreateTicketMutation } from '@/services/dashboard/dashboard.api'; // your RTK Query or react-query mutation hook
// import { toast } from 'react-toastify'; // optional for user feedback

interface Reporter {
    _id: string;
    name: string;
}

interface Props {
    reporters: Reporter[];
}

export const CreateTicketDialogContainer: React.FC<Props> = ({ reporters }) => {
    const [open, setOpen] = useState(false);
    const [createTicket, { isLoading }] = useCreateTicketMutation();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = async (data: any) => {
        try {
            await createTicket(data).unwrap();
            //   toast.success('Ticket created successfully!');
            handleClose();
        } catch (error) {
            //   toast.error('Failed to create ticket.');
            console.error(error);
        }
    };

    return (
        <>
            <button onClick={handleOpen}>Create Ticket</button>
            <CreateTicketForm
                open={open}
                onClose={handleClose}
                onSubmit={handleSubmit}
                reporters={reporters}
            />
        </>
    );
};
