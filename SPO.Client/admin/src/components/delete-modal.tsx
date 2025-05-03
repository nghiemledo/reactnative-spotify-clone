/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from './ui/button';

type Props = {
    deleteModalOpen: boolean;
    setDeleteModalOpen: (open: boolean) => void;
    row: any;
    loading: boolean;
    handleDelete: () => void;
}

const DeleteModal: React.FC<Props> = ({ deleteModalOpen, setDeleteModalOpen, row, loading, handleDelete }) => {
    
    return (
        <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete data</DialogTitle>
                    <DialogDescription>
                        Are you sure want to delete <strong>{row.original.name}</strong>? This action can not be undo.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => setDeleteModalOpen(false)}
                        disabled={loading}
                        className='cursor-pointer'
                    >
                        Hủy
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={loading}
                        className='cursor-pointer'
                    >
                        {loading ? 'Deleting...' : 'Delete'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteModal;