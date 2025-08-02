import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, TextField, MenuItem,
} from '@mui/material';
import { createTicketSchema } from '../services/dashboard.schema';
import type { z } from 'zod';

type CreateTicketInput = z.input<typeof createTicketSchema>;

interface CreateTicketFormProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: CreateTicketInput) => void;
    reporters: { _id: string; name: string }[];
}

export const CreateTicketForm: React.FC<CreateTicketFormProps> = ({ open, onClose, onSubmit, reporters }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<CreateTicketInput>({
        resolver: zodResolver(createTicketSchema),
        defaultValues: {
            title: '',
            reporter: '',
            estimateTime: 0,
            timeSpentInProgress: 0,
            currentState: 'open',
        },
    });

    const handleFormSubmit = (data: CreateTicketInput) => {
        onSubmit(data);
        reset();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Create Ticket</DialogTitle>
            <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
                <DialogContent dividers>
                    <TextField
                        placeholder="Title"
                        fullWidth
                        margin="normal"
                        {...register('title')}
                        error={!!errors.title}
                        helperText={errors.title?.message}
                    />
                    <TextField
                        placeholder="Reporter"
                        select
                        fullWidth
                        margin="normal"
                        {...register('reporter')}
                        error={!!errors.reporter}
                        helperText={errors.reporter?.message}
                        defaultValue=""
                    >
                        <MenuItem value=""><em>Select reporter</em></MenuItem>
                        {reporters.map(rep => (
                            <MenuItem key={rep._id} value={rep._id}>{rep.name}</MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        placeholder="Estimate Time (hours)"
                        type="number"
                        fullWidth
                        margin="normal"
                        {...register('estimateTime', { valueAsNumber: true })}
                        error={!!errors.estimateTime}
                        helperText={errors.estimateTime?.message}
                        inputProps={{ min: 0 }}
                    />
                    <TextField
                        placeholder="Time Spent In Progress (hours)"
                        type="number"
                        fullWidth
                        margin="normal"
                        {...register('timeSpentInProgress', { valueAsNumber: true })}
                        error={!!errors.timeSpentInProgress}
                        helperText={errors.timeSpentInProgress?.message}
                        inputProps={{ min: 0 }}
                    />
                    <TextField
                        placeholder="Current State"
                        select
                        fullWidth
                        margin="normal"
                        {...register('currentState')}
                        error={!!errors.currentState}
                        helperText={errors.currentState?.message}
                        defaultValue="open"
                    >
                        {['open', 'inprogress', 'inpending', 'blocked', 'qa_review'].map(state => (
                            <MenuItem key={state} value={state}>{state}</MenuItem>
                        ))}
                    </TextField>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button variant='outlined' color='error' onClick={onClose}>Cancel</Button>
                    <Button type="submit" variant="contained" color="primary">Create</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};
