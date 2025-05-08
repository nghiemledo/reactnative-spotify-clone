/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { Song } from "@/types/song.type";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { EyeIcon } from "../eye-icon";
import { EditIcon } from "../edit-icon";
import { DeleteIcon } from "../delete-icon";
import DeleteModal from "../delete-modal";
import { RootState, useAppDispatch, useAppSelector } from "@/store/store";
import { deleteSongData } from "@/store/song/song.actions";
import { useNavigate } from "react-router-dom";
import { getArtistById } from "@/store/artist/artist.actions";
import { getGenreById } from "@/store/genre/genre.actions";
import { formatDate } from "@/utils/formatDate";


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
        accessorKey: "coverImage",
        header: "Cover Image",
        cell: ({ row }) => {
            return (
                <div className="w-20 h-20">
                    <img className="w-full h-full object-cover rounded-xl" src={row.original.coverImage} alt={row.original.title} />
                </div>
            )
        }
    },
    {
        accessorKey: "duration",
        header: "Duration",
    },
    {
        accessorKey: "artistId",
        header: "Artist",
        cell: ({ row }) => {
            const dispatch = useAppDispatch();
            const { artistDetail } = useAppSelector((state: RootState) => state.artist);
            useEffect(() => {
                dispatch(getArtistById(row.original.artistId));
            }, [row.original.artistId]);
            return (
                <>
                    {artistDetail?.name}
                </>
            )
        }
    },
    {
        accessorKey: "genreId",
        header: "Genre",
        cell: ({ row }) => {
            const dispatch = useAppDispatch();
            const { genreDetail } = useAppSelector((state: RootState) => state.genre);
            useEffect(() => { dispatch(getGenreById(row.original.genreId)) }, [row.original.genreId]);
            return (
                <>
                    {genreDetail?.name}
                </>
            )

        }
    },
    {
        accessorKey: "albumId",
        header: "Album",
        cell: ({ row }) => {
            return row.original.albumId
        }
    },
    {
        accessorKey: "createdAt",
        header: "Release Date",
        cell: ({ row }) => {
            return (
                <>{formatDate(row.original.createdAt!)}</>
            )
        }
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
                navigate(`/admin/songs/${row.original.id}`);
            };

            const handleEdit = () => {
                navigate(`/admin/songs/${row.original.id}/edit`);
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