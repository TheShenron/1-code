export const ERROR_MESSAGES = {
    AUTH: {
        INVALID_CREDENTIALS: {
            code: 'INVALID_CREDENTIALS',
            message: 'Email or password is incorrect'
        },
        UNAUTHORIZED: {
            code: 'UNAUTHORIZED',
            message: 'You are not authorized to access this resource'
        }
    },
    RESPONSE: {
        MISSING_PAYLOAD: {
            code: 'RESPONSE_NOT_PREPARED',
            message: 'Operation completed, but no response was prepared properly'
        }
    },
    USER: {
        NOT_FOUND: {
            code: 'USER_NOT_FOUND',
            message: 'User not found'
        },
        EMAIL_ALREADY_EXISTS: {
            code: 'EMAIL_ALREADY_EXISTS',
            message: 'Email is already in use',
        },
        USER_CREATION_FAILED: {
            code: 'USER_CREATION_FAILED',
            message: 'Failed to create user',
        }
    },
    FORM_VALIDATION: {
        FAILED: {
            code: 'FORM_VALIDATION_FAILED',
            message: 'Form validation failed.'
        },
    },
    TICKET: {
        CREATE_FAILED: {
            code: 'TICKET_CREATE_FAILED',
            message: 'Failed to create ticket.'
        },
        UPDATE_FAILED: {
            code: 'TICKET_UPDATE_FAILED',
            message: 'Failed to update ticket.'
        },
        NOT_FOUND: {
            code: 'TICKET_NOT_FOUND',
            message: 'Ticket not found.'
        },
        DELETE_FAILED: {
            code: 'TICKET_DELETE_FAILED',
            message: 'Failed to delete ticket.'
        },
    }

};
