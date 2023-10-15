import { Button } from '@/components/ui/button';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, IconButton } from '@mui/material';
import React, { ReactNode, createContext, useContext, useState } from 'react';

interface DialogContextType {
    open: boolean
    openDialog: (openDialogProps: OpenDialogProps) => void
    closeDialog: () => void
}

interface DialogProviderProps {
    children: ReactNode
}

export type OpenDialogProps = {
    title: string,
    dialogContent: ReactNode,
    withButtonConfirm?: boolean,
    dialogProps?: DialogProps,
    buttonConfirmText?: string,
    onConfirm?: () => void
}

const defaultOpenDialogProps: OpenDialogProps = {
    title: 'Título',
    buttonConfirmText: 'Confirmar',
    withButtonConfirm: true,
    dialogContent: <>Conteúdo do Modal</>
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const DialogProvider: React.FC<DialogProviderProps> = ({ children }) => {
    const [open, setOpen] = useState(false)
    const [openDialogProps, setOpenDialogProps] = useState<OpenDialogProps | null>(null)

    const openDialog = (openDialogProps: OpenDialogProps) => {
        setOpenDialogProps({
            ...defaultOpenDialogProps,
            ...openDialogProps,
            onConfirm: () => {
                if (openDialogProps.onConfirm) {
                    openDialogProps.onConfirm()
                }

                closeDialog()
            }
        })

        setOpen(true)
    }

    const closeDialog = () => {
        setOpen(false)
    }

    return (
        <DialogContext.Provider value={{ open, openDialog, closeDialog }}>
            {children}
            <Dialog open={open} onClose={closeDialog} fullWidth  {...openDialogProps?.dialogProps}>
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    {openDialogProps?.title}
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
                    {openDialogProps?.dialogContent}
                </DialogContent>
                {openDialogProps?.withButtonConfirm ? (
                    <DialogActions>
                        <Button
                            type='submit'
                            autoFocus
                            onClick={() => openDialogProps?.onConfirm ?
                                openDialogProps?.onConfirm() :
                                null
                            }
                        >
                            {openDialogProps?.buttonConfirmText}
                        </Button>
                    </DialogActions>
                ) : null}
            </Dialog>
        </DialogContext.Provider>
    )
}

export const useDialogContext = (): DialogContextType => {
    const context = useContext(DialogContext)

    if (!context) {
        throw new Error('useDialogContext must be used within a DialogProvider')
    }

    return context
}