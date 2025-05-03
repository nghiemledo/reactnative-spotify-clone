/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { Song } from "@/types/song.type";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { EyeIcon } from "../eye-icon";
import { EditIcon } from "../edit-icon";
import { DeleteIcon } from "../delete-icon";
import { cn } from "@/lib/utils";
import DeleteModal from "../delete-modal";
import { useAppDispatch } from "@/store/store";
import { deleteSongData } from "@/store/song/song.actions";
import { useNavigate } from "react-router-dom";

export const columns: ColumnDef<Song>[] = [
    {
        accessorKey: "index",
        header: "No.",
        cell: ({ row }) => row.index + 1,
    },
    {
        accessorKey: "title",
        header: "Title",
    },
    {
        accessorKey: "artist",
        header: "Artist",
    },
    {
        accessorKey: "album",
        header: "Album",
    },
    {
        accessorKey: "duration",
        header: "Duration",
    },
    {
        accessorKey: "releaseDate",
        header: "Release Date",
    },
    {
        accessorKey: "genre",
        header: "Genre",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status") as string;
            return (
                <span
                    className={cn(
                        "px-2 py-1 text-sm font-medium rounded",
                        status === "Published" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    )}
                >
                    {status}
                </span>
            );
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
                navigate(`/admin/songs/${row.original.slug}`);
            };

            const handleEdit = () => {
                navigate(`/admin/songs/${row.original.slug}/edit`);
            }

            const handleDelete = async () => {
                setLoading(true);
                try {
                    await dispatch(deleteSongData(row.original.id)).unwrap();
                    toast('Success', {
                        description: `Deleted data ${row.original.title}`,
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