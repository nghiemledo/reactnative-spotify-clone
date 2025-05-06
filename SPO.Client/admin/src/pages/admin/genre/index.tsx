import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const ManageGenre: React.FC = () => {
    return (
        <div className="container mx-auto">
            <div className="mb-5 flex items-center justify-between space-y-2">
                <h1 className="text-2xl font-bold tracking-tight">Genre Management</h1>
                <div className="flex items-center space-x-2 cursor-not-allowed">
                    <Button
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 cursor-pointer"
                        asChild
                    >
                        <Link to={'/admin/genres/add'}>
                            <PlusCircle className="h-4 w-4" />
                            Add Genre
                        </Link>
                    </Button>
                </div>
            </div>
            
        </div>
    );
};

export default ManageGenre;