import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import styles from './Register.module.css';
import { ShadcnProvider } from '@/components/ui/ShadcnProvider';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validateForm = () => {
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return false;
        }
        if (formData.password.length < 8) {
            setError('Password must be at least 8 characters long');
            return false;
        }
        if (!agreeToTerms) {
            setError('You must agree to the Terms and Conditions');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setError('');
        setIsLoading(true);

        try {
            // Add your registration logic here
            // await registerUser(formData);
            navigate('/login');
        } catch (err) {
            setError('Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ShadcnProvider>
            <div className={styles.container}>
                <div className={styles.leftPanel}>
                    <div className={styles.brandingContent}>
                        <h1>Create Account</h1>
                        <p>Join us to explore our amazing products and services</p>
                    </div>
                </div>
    
                <div className={styles.rightPanel}>
                    <Card className={styles.registerCard}>
                        <CardHeader>
                            <CardTitle>Sign Up</CardTitle>
                            <CardDescription>Create your account to get started</CardDescription>
                        </CardHeader>
    
                        <CardContent>
                            <form onSubmit={handleSubmit} className={styles.form}>
                                {error && (
                                    <Alert variant="destructive" className={styles.alert}>
                                        <AlertDescription>{error}</AlertDescription>
                                    </Alert>
                                )}
    
                                <div className={styles.nameFields}>
                                    <div className={styles.inputGroup}>
                                        <Label htmlFor="firstName">First Name</Label>
                                        <Input
                                            id="firstName"
                                            name="firstName"
                                            placeholder="John"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
    
                                    <div className={styles.inputGroup}>
                                        <Label htmlFor="lastName">Last Name</Label>
                                        <Input
                                            id="lastName"
                                            name="lastName"
                                            placeholder="Doe"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
    
                                <div className={styles.inputGroup}>
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="john.doe@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
    
                                <div className={styles.inputGroup}>
                                    <Label htmlFor="password">Password</Label>
                                    <div className={styles.passwordInput}>
                                        <Input
                                            id="password"
                                            name="password"
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Create a strong password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                        />
                                        <button
                                            type="button"
                                            className={styles.eyeIcon}
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
                                        </button>
                                    </div>
                                </div>
    
                                <div className={styles.inputGroup}>
                                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                                    <Input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        placeholder="Confirm your password"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
    
                                <div className={styles.termsGroup}>
                                    <div className={styles.checkboxWrapper}>
                                        <Checkbox id="terms" checked={agreeToTerms} onCheckedChange={setAgreeToTerms} />
                                        <Label htmlFor="terms" className={styles.termsLabel}>
                                            I agree to the{' '}
                                            <a href="/terms" className={styles.link}>
                                                Terms and Conditions
                                            </a>
                                        </Label>
                                    </div>
                                </div>
    
                                <Button type="submit" className={styles.submitButton} disabled={isLoading}>
                                    {isLoading ? 'Creating Account...' : 'Create Account'}
                                </Button>
                            </form>
                        </CardContent>
    
                        <CardFooter className={styles.footer}>
                            <p>
                                Already have an account?{' '}
                                <a href="/login" className={styles.link}>
                                    Sign in
                                </a>
                            </p>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </ShadcnProvider>
    );
};

export default Register;
