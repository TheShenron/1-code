import React, { useState } from 'react';
import { CreateTicketForm } from './CreateTicketForm';
import { useCreateTicketMutation } from '../services/dashboard.query'; // your RTK Query or react-query mutation hook
import { Button } from '@mui/material';
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
    const { mutateAsync } = useCreateTicketMutation();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = async (data: any) => {
        try {
            await mutateAsync(data);
            //   toast.success('Ticket created successfully!');
            handleClose();
        } catch (error) {
            //   toast.error('Failed to create ticket.');
            console.error(error);
        }
    };

    return (
        <>
            <Button variant='contained' onClick={handleOpen}>Create Ticket</Button>
            {open && <CreateTicketForm
                open={open}
                onClose={handleClose}
                onSubmit={handleSubmit}
                reporters={reporters}
            />}
        </>
    );
};
