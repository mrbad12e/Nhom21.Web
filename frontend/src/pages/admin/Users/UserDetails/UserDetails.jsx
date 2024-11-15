// pages/admin/Users/UserDetails/UserDetails.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserForm } from '@/components/admin/users/UserForm';
import styles from './UserDetails.module.css';

// Mock data for editing - replace with API call later
const MOCK_USER = {
    id: '1',
    username: 'johndoe',
    email: 'john@example.com',
    first_name: 'John',
    last_name: 'Doe',
    role: 'USER',
    created_at: '2024-01-15T10:00:00Z',
};

const UserDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = id !== undefined;

    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Simulate fetching user data for edit mode
        if (isEditMode) {
            setUser(MOCK_USER);
        }
    }, [isEditMode]);

    const handleSubmit = async (data) => {
        try {
            setIsLoading(true);

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            console.log('Form submitted:', data);

            // Navigate back to user list after success
            navigate('/admin/users');
        } catch (error) {
            console.error('Error saving user:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Button
                    variant="ghost"
                    size="sm"
                    className={styles.backButton}
                    onClick={() => navigate('/admin/users')}
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Users
                </Button>
                <h1 className={styles.title}>{isEditMode ? 'Edit User' : 'Create New User'}</h1>
            </div>

            <div className={styles.content}>
                {isEditMode && !user ? (
                    <div className={styles.loading}>Loading user data...</div>
                ) : (
                    <UserForm
                        initialData={user}
                        onSubmit={handleSubmit}
                        isLoading={isLoading}
                        isEditMode={isEditMode}
                    />
                )}
            </div>
        </div>
    );
};

export default UserDetails;
