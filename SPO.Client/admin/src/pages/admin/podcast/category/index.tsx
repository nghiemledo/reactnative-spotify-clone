import { DataTable } from '@/components/data-table';
import { columns } from '@/components/podcast-category/columns';
import Loading from '@/components/loading';
import { Button } from '@/components/ui/button';
import { getPodcastCategoryData } from '@/store/podcast-category/podcast-category.actions';
import { RootState, useAppDispatch, useAppSelector } from '@/store/store';
import { PlusCircle } from 'lucide-react';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const ManagePodcastCategories: React.FC = () => {
    const { podcastCategoryData, loading } = useAppSelector((state: RootState) => state.podcastCategory);
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getPodcastCategoryData());
    }, [dispatch]);

    return (
        <div className="container mx-auto">
            <div className="mb-5 flex items-center justify-between space-y-2">
                <h1 className="text-2xl font-bold tracking-tight">Podcast Category Management</h1>
                <div className="flex items-center space-x-2 cursor-not-allowed">
                    <Button
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 cursor-pointer"
                        asChild
                    >
                        <Link to={'/admin/podcast-categories/add'}>
                            <PlusCircle className="h-4 w-4" />
                            Add Category
                        </Link>
                    </Button>
                </div>
            </div>
            {loading ? (
                <Loading />
            ) : (
                <DataTable columns={columns} data={podcastCategoryData} />
            )
            }
        </div>
    );
};

export default ManagePodcastCategories;