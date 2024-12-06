import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useState } from 'react';
import styles from './Login.module.css';
import { ShadcnProvider } from '@/components/ui/ShadcnProvider';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('customer');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            // Add your login logic here
            // const response = await loginUser(email, password, role);

            // Role-based navigation
            if (role === 'admin') {
                navigate('/admin/dashboard');
            } else {
                navigate('/dashboard');
            }
        } catch (err) {
            setError('Invalid credentials');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ShadcnProvider>
            <div className={styles.container}>
                <div className={styles.leftPanel}>
                    <div className={styles.brandingContent}>
                        <h1>Welcome Back</h1>
                        <p>Login to access your {role === 'admin' ? 'admin panel' : 'account'}</p>
                    </div>
                </div>

                <div className={styles.rightPanel}>
                    <Card className={styles.loginCard}>
                        <CardHeader>
                            <CardTitle>Sign In</CardTitle>
                            <CardDescription>
                                Enter your credentials to access your {role === 'admin' ? 'admin panel' : 'account'}
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            <form onSubmit={handleSubmit} className={styles.form}>
                                {error && (
                                    <Alert variant="destructive" className={styles.alert}>
                                        <AlertDescription>{error}</AlertDescription>
                                    </Alert>
                                )}

                                <div className={styles.roleSelector}>
                                    <Label>Select Role</Label>
                                    <RadioGroup
                                        defaultValue="customer"
                                        value={role}
                                        onValueChange={setRole}
                                        className={styles.radioGroup}
                                    >
                                        <div className={styles.radioOption}>
                                            <RadioGroupItem value="customer" id="customer" />
                                            <Label htmlFor="customer" className={styles.radioLabel}>
                                                Customer
                                            </Label>
                                        </div>
                                        <div className={styles.radioOption}>
                                            <RadioGroupItem value="admin" id="admin" />
                                            <Label htmlFor="admin" className={styles.radioLabel}>
                                                Administrator
                                            </Label>
                                        </div>
                                    </RadioGroup>
                                </div>

                                <div className={styles.inputGroup}>
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className={styles.inputGroup}>
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                <Button type="submit" className={styles.submitButton} disabled={isLoading}>
                                    {isLoading ? 'Signing in...' : 'Sign In'}
                                </Button>
                            </form>
                        </CardContent>

                        <CardFooter className={styles.footer}>
                            <p>
                                {role === 'customer' && (
                                    <>
                                        Don't have an account?{' '}
                                        <a href="/register" className={styles.link}>
                                            Create one
                                        </a>
                                    </>
                                )}
                            </p>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </ShadcnProvider>
    );
};

export default Login;
