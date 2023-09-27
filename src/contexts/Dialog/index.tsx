import { Button } from '@/components/ui/button';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, IconButton } from '@mui/material';
import React, { ReactNode, createContext, useContext, useState } from 'react';

interface DialogContextType {
    open: boolean
    openDialog: (dialogContent: ReactNode, dialogProps?: DialogProps) => void
    closeDialog: () => void
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

interface DialogProviderProps {
    children: ReactNode
}

export const DialogProvider: React.FC<DialogProviderProps> = ({ children }) => {
    const [open, setOpen] = useState(false)
    const [dialogContent, setDialogContent] = useState<ReactNode | null>(null)
    const [dialogProps, setDialogProps] = useState<DialogProps | null>(null)

    const openDialog = (content: ReactNode, props?: DialogProps) => {
        setDialogContent(content)
        setDialogProps(props || null)
        setOpen(true)
    }

    const closeDialog = () => {
        setOpen(false)
    }

    return (
        <DialogContext.Provider value={{ open, openDialog, closeDialog }}>
            {children}
            <Dialog open={open} onClose={closeDialog} fullWidth  {...dialogProps}>
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Modal title
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={closeDialog}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    {dialogContent}
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={closeDialog}>
                        Salvar
                    </Button>
                </DialogActions>
            </Dialog>
        </DialogContext.Provider>
    )
}

export const useDialog = (): DialogContextType => {
    const context = useContext(DialogContext)
    if (!context) {
        throw new Error('useDialog must be used within a DialogProvider')
    }
    return context
}
