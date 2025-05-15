/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { EyeIcon } from "../eye-icon";
import { EditIcon } from "../edit-icon";
import { DeleteIcon } from "../delete-icon";
import DeleteModal from "../delete-modal";
import { useAppDispatch } from "@/store/store";
import { useNavigate } from "react-router-dom";
import { formatDate } from "@/utils/formatDate";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { User } from "@/types/user.type";
import { deleteUserData } from "@/store/user/user.actions";

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: "index",
        header: "No.",
        cell: ({ row }) => row.index + 1,
    },
    {
        accessorKey: "fullName",
        header: "Full Name",
    },
    {
        accessorKey: "dateOfBirth",
        header: "DOB",
    },
    {
        accessorKey: "gender",
        header: "Gender",
    },
    {
        accessorKey: "urlAvatar",
        header: "Avatar",
        cell: ({ row }) => {
            return (
                <Avatar>
                    <AvatarImage className="object-cover w-full h-full" src={row.original.urlAvatar} />
                    <AvatarFallback>AVA</AvatarFallback>
                </Avatar>
            )
        }
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({ row }) => {
            return formatDate(row.original.createdAt!);
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const dispatch = useAppDispatch();
            const navigate = useNavigate();
            const [deleteModalOpen, setDeleteModalOpen] = useState(false);
            const [loading, setLoading] = useState(false);

            const handleView = () => {
                navigate(`/admin/users/${row.original.id}`);
            };

            const handleEdit = () => {
                navigate(`/admin/users/${row.original.id}/edit`);
            }

            const handleDelete = async () => {
                setLoading(true);
                try {
                    await dispatch(deleteUserData(row.original.id!)).unwrap();
                    toast('Success', {
                        description: `Deleted data ${row.original.fullName}`,
                    });
                    setDeleteModalOpen(false);
                } catch (error: any) {
                    console.error('Delete failed:', error);
                    toast('Error', {
                        description: 'Can not delete data. Please try again later.',
                    });
                } finally {
                    setLoading(false);
                }
            };

            return (
                <div className="relative flex items-center gap-3">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <span className="text-lg cursor-pointer active:opacity-50"
                                    onClick={handleView}
                                >
                                    <EyeIcon />
                                </span>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>View</p>
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <span className="text-lg cursor-pointer active:opacity-50"
                                    onClick={handleEdit}
                                >
                                    <EditIcon />
                                </span>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Update</p>
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <span className="text-lg text-red-400 cursor-pointer active:opacity-50"
                                    onClick={() => setDeleteModalOpen(true)}
                                >
                                    <DeleteIcon />
                                </span>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Delete</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <DeleteModal
                        deleteModalOpen={deleteModalOpen}
                        setDeleteModalOpen={setDeleteModalOpen}
                        row={row}
                        loading={loading}
                        handleDelete={handleDelete}
                    />
                </div>
            )
        }
    },
];