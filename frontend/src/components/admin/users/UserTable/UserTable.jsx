import React from 'react';
import { format } from 'date-fns';
import { ChevronDown, MoreHorizontal, Pencil, Trash } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import styles from './UserTable.module.css';

const UserTable = ({ users, onEdit, onDelete, sortConfig, onSort, selectedUsers, onSelectUser, onSelectAll }) => {
    const getSortIcon = (columnKey) => {
        if (sortConfig.key === columnKey) {
            return (
                <ChevronDown
                    className={`ml-1 h-4 w-4 ${sortConfig.direction === 'desc' ? 'transform rotate-180' : ''}`}
                />
            );
        }
        return <ChevronDown className="ml-1 h-4 w-4 opacity-0 group-hover:opacity-100" />;
    };

    const handleSort = (key) => {
        onSort(key);
    };

    return (
        <div className={styles.tableContainer}>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-12">
                            <Checkbox
                                checked={selectedUsers.length === users.length && users.length > 0}
                                onCheckedChange={(checked) => onSelectAll(checked)}
                                aria-label="Select all"
                            />
                        </TableHead>
                        <TableHead className={styles.sortableHeader} onClick={() => handleSort('username')}>
                            <span className="group flex items-center">
                                Username
                                {getSortIcon('username')}
                            </span>
                        </TableHead>
                        <TableHead className={styles.sortableHeader} onClick={() => handleSort('email')}>
                            <span className="group flex items-center">
                                Email
                                {getSortIcon('email')}
                            </span>
                        </TableHead>
                        <TableHead className={styles.sortableHeader} onClick={() => handleSort('first_name')}>
                            <span className="group flex items-center">
                                First Name
                                {getSortIcon('first_name')}
                            </span>
                        </TableHead>
                        <TableHead className={styles.sortableHeader} onClick={() => handleSort('last_name')}>
                            <span className="group flex items-center">
                                Last Name
                                {getSortIcon('last_name')}
                            </span>
                        </TableHead>
                        <TableHead className={styles.sortableHeader} onClick={() => handleSort('role')}>
                            <span className="group flex items-center">
                                Role
                                {getSortIcon('role')}
                            </span>
                        </TableHead>
                        <TableHead className={styles.sortableHeader} onClick={() => handleSort('created_at')}>
                            <span className="group flex items-center">
                                Created At
                                {getSortIcon('created_at')}
                            </span>
                        </TableHead>
                        <TableHead className="w-12">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>
                                <Checkbox
                                    checked={selectedUsers.includes(user.id)}
                                    onCheckedChange={(checked) => onSelectUser(user.id, checked)}
                                    aria-label={`Select ${user.username}`}
                                />
                            </TableCell>
                            <TableCell className="font-medium">{user.username}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.first_name}</TableCell>
                            <TableCell>{user.last_name}</TableCell>
                            <TableCell>
                                <span className={styles.roleChip}>{user.role}</span>
                            </TableCell>
                            <TableCell>{format(new Date(user.created_at), 'MMM d, yyyy')}</TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                            <MoreHorizontal className="h-4 w-4" />
                                            <span className="sr-only">Open menu</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <DropdownMenuItem onClick={() => onEdit(user)}>
                                            <Pencil className="mr-2 h-4 w-4" />
                                            Edit
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="text-destructive" onClick={() => onDelete(user)}>
                                            <Trash className="mr-2 h-4 w-4" />
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default UserTable;
