import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import styles from './UserForm.module.css';

const userFormSchema = z.object({
    username: z
        .string()
        .min(3, 'Username must be at least 3 characters')
        .max(255, 'Username must be less than 255 characters'),
    password: z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .max(255, 'Password must be less than 255 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number')
        .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
    email: z.string().email('Invalid email address').max(255, 'Email must be less than 255 characters'),
    first_name: z.string().min(1, 'First name is required').max(255, 'First name must be less than 255 characters'),
    last_name: z.string().min(1, 'Last name is required').max(255, 'Last name must be less than 255 characters'),
    role: z.enum(['USER', 'ADMIN', 'MANAGER']),
});

const UserForm = ({ initialData, onSubmit, isLoading, isEditMode = false }) => {
    const form = useForm({
        resolver: zodResolver(userFormSchema),
        defaultValues: {
            username: initialData?.username || '',
            password: '',
            email: initialData?.email || '',
            first_name: initialData?.first_name || '',
            last_name: initialData?.last_name || '',
            role: initialData?.role || 'USER',
        },
    });

    const handleSubmit = async (data) => {
        try {
            await onSubmit(data);
            if (!isEditMode) {
                form.reset();
            }
        } catch (error) {
            console.error('Form submission error:', error);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className={styles.form}>
                <div className={styles.formGrid}>
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem className={styles.fullWidth}>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="johndoe" {...field} disabled={isEditMode} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {!isEditMode && (
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className={styles.fullWidth}>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="••••••••" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}

                    <FormField
                        control={form.control}
                        name="first_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="John" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="last_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className={styles.fullWidth}>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="john.doe@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                            <FormItem className={styles.fullWidth}>
                                <FormLabel>Role</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a role" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="USER">User</SelectItem>
                                        <SelectItem value="ADMIN">Admin</SelectItem>
                                        <SelectItem value="MANAGER">Manager</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className={styles.actions}>
                    <Button type="button" variant="outline" onClick={() => form.reset()} disabled={isLoading}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? 'Saving...' : isEditMode ? 'Update User' : 'Create User'}
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default UserForm;
