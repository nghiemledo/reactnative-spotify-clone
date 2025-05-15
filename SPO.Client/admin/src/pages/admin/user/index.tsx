import { DataTable } from '@/components/data-table';
import Loading from '@/components/loading';
import { Button } from '@/components/ui/button';
import { RootState, useAppDispatch, useAppSelector } from '@/store/store';
import { PlusCircle } from 'lucide-react';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUserData } from '@/store/user/user.actions';
import { columns } from '@/components/user/columns';

const ManageUser: React.FC = () => {
    const { userData, loading } = useAppSelector((state: RootState) => state.user);
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getUserData());
    }, [dispatch]);

    return (
        <div className="container mx-auto">
            <div className="mb-5 flex items-center justify-between space-y-2">
                <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
                <div className="flex items-center space-x-2 cursor-not-allowed">
                    <Button
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 cursor-pointer"
                        asChild
                    >
                        <Link to={'/admin/users/add'}>
                            <PlusCircle className="h-4 w-4" />
                            Add User
                        </Link>
                    </Button>
                </div>
            </div>
            {loading ? (
                <Loading />
            ) : (
                <DataTable columns={columns} data={userData} />
            )
            }
        </div>
    );
};

export default ManageUser;