import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { UserTable } from '@/components/admin/users/UserTable';
import styles from './UserList.module.css';

const MOCK_USERS = [
    {
        id: '1',
        username: 'johndoe',
        email: 'john@example.com',
        first_name: 'John',
        last_name: 'Doe',
        role: 'USER',
        created_at: '2024-01-15T10:00:00Z',
    },
    {
        id: '2',
        username: 'janedoe',
        email: 'jane@example.com',
        first_name: 'Jane',
        last_name: 'Doe',
        role: 'ADMIN',
        created_at: '2024-01-16T11:00:00Z',
    },
    {
        id: '3',
        username: 'bobsmith',
        email: 'bob@example.com',
        first_name: 'Bob',
        last_name: 'Smith',
        role: 'MANAGER',
        created_at: '2024-01-17T12:00:00Z',
    },
];

const UserList = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState(MOCK_USERS);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [sortConfig, setSortConfig] = useState({
        key: 'created_at',
        direction: 'desc',
    });
    const [userToDelete, setUserToDelete] = useState(null);

    const handleSort = (key) => {
        const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';

        const sortedUsers = [...users].sort((a, b) => {
            if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
            if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
            return 0;
        });

        setUsers(sortedUsers);
        setSortConfig({ key, direction });
    };

    const handleSelectUser = (userId, checked) => {
        setSelectedUsers((current) => {
            if (checked) {
                return [...current, userId];
            }
            return current.filter((id) => id !== userId);
        });
    };

    const handleSelectAll = (checked) => {
        setSelectedUsers(checked ? users.map((user) => user.id) : []);
    };

    const handleEdit = (user) => {
        navigate(`/admin/users/${user.id}/edit`);
    };

    const handleDelete = () => {
        if (userToDelete) {
            setUsers((current) => current.filter((user) => user.id !== userToDelete.id));
            setSelectedUsers((current) => current.filter((id) => id !== userToDelete.id));
            setUserToDelete(null);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Users</h1>
                <Button onClick={() => navigate('/admin/users/new')}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add User
                </Button>
            </div>

            <div className={styles.content}>
                <UserTable
                    users={users}
                    onEdit={handleEdit}
                    onDelete={setUserToDelete}
                    sortConfig={sortConfig}
                    onSort={handleSort}
                    selectedUsers={selectedUsers}
                    onSelectUser={handleSelectUser}
                    onSelectAll={handleSelectAll}
                />
            </div>

            <AlertDialog open={!!userToDelete} onOpenChange={() => setUserToDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete{' '}
                            <span className="font-semibold">{userToDelete?.username}</span>'s account and all associated
                            data.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default UserList;
