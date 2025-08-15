import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  InputAdornment,
} from '@mui/material';
import {
  CreateTicket,
  UpdateTicket,
  CreateTicketInput,
  createTicketSchema,
  Ticket,
  Ticketreporter,
} from '../schema/tickect.schema';

interface BaseProps {
  open: boolean;
  onClose: () => void;
  reporter: Ticketreporter[];
}

interface CreateProps extends BaseProps {
  mode: 'create';
  onSubmit: (_data: CreateTicket) => void;
  initialData?: never;
  onDelete?: never;
}

interface UpdateProps extends BaseProps {
  mode: 'update';
  onSubmit: (_data: UpdateTicket) => void;
  initialData: Ticket;
  onDelete: (_id: string) => void;
}

type TicketFormProps = CreateProps | UpdateProps;

const skipTitlesSet = new Set(
  ['Daily Standup / Daily Sync', 'Stakeholder, Ad-hoc and Internal Meetings'].map(title =>
    title.toLowerCase()
  )
);

const TicketForm: React.FC<TicketFormProps> = ({
  open,
  onClose,
  onSubmit,
  onDelete,
  initialData,
  mode = 'create',
  reporter,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<CreateTicketInput>({
    resolver: zodResolver(createTicketSchema),
    defaultValues: {
      title: '',
      reporter: '',
      estimateTime: 0,
      timeSpentInProgress: 0,
      currentState: 'open',
    },
  });

  const selectedReporter = watch('reporter');
  const selectedTicketStatus = watch('currentState');
  const currentTitle = watch('title') || '';
  const shouldHideDeleteButton = skipTitlesSet.has(currentTitle.toLowerCase());

  const handleFormSubmit = async (data: CreateTicketInput): Promise<void> => {
    const parsedData = createTicketSchema.parse(data);

    if (mode === 'update') {
      const updateData: UpdateTicket = {
        ...parsedData,
        id: initialData!._id,
      };
      (onSubmit as (_data: UpdateTicket) => void)(updateData);
    } else {
      (onSubmit as (_data: CreateTicket) => void)(parsedData);
    }

    reset();
  };

  const handleTicketDelete = (): void => {
    onDelete?.(initialData?._id ?? '');
    reset();
    onClose();
  };

  useEffect(() => {
    if (initialData?._id) {
      reset({
        title: initialData.title,
        reporter: initialData.reporter._id,
        estimateTime: initialData.estimateTime,
        timeSpentInProgress: 0,
        currentState: initialData.currentState,
      });
    }
  }, [initialData, reset]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{mode === 'update' ? 'Update Ticket' : 'Create Ticket'}</DialogTitle>
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
            value={selectedReporter || ''}
            disabled={mode === 'update'}
          >
            <MenuItem value="">
              <em>Select reporter</em>
            </MenuItem>
            {reporter.map(rep => (
              <MenuItem key={rep._id} value={rep._id}>
                {rep.name}
              </MenuItem>
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
            disabled={mode === 'update'}
            slotProps={{
              input: {
                endAdornment: <InputAdornment position="end">Hours</InputAdornment>,
              },
            }}
          />
          <TextField
            placeholder="Time Spent In Progress (hours)"
            type="number"
            fullWidth
            margin="normal"
            {...register('timeSpentInProgress', { valueAsNumber: true })}
            error={!!errors.timeSpentInProgress}
            helperText={errors.timeSpentInProgress?.message}
            disabled={mode === 'update'}
            slotProps={{
              input: {
                endAdornment: <InputAdornment position="end">Hours</InputAdornment>,
              },
            }}
          />
          <TextField
            placeholder="Current State"
            select
            fullWidth
            margin="normal"
            {...register('currentState')}
            error={!!errors.currentState}
            helperText={errors.currentState?.message}
            value={selectedTicketStatus || 'open'}
            disabled={mode === 'update'}
          >
            {['open', 'inprogress', 'inpending', 'blocked', 'qa_review'].map(state => (
              <MenuItem key={state} value={state}>
                {state}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          {mode === 'update' && !shouldHideDeleteButton && (
            <Button
              variant="contained"
              color="error"
              sx={{ mr: 'auto' }}
              onClick={handleTicketDelete}
            >
              Delete
            </Button>
          )}
          <Button variant="outlined" color="error" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            {mode === 'update' ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default TicketForm;
