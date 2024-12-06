import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductImageUpload } from '../ProductImageUpload';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Save, X, Loader2 } from 'lucide-react';
import styles from './ProductForm.module.css';

// Form validation schema
const productSchema = z.object({
    name: z
        .string()
        .min(2, 'Product name must be at least 2 characters')
        .max(255, 'Product name must be less than 255 characters'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    price: z
        .string()
        .regex(/^\d+(\.\d{1,2})?$/, 'Invalid price format')
        .refine((val) => parseFloat(val) >= 0, 'Price cannot be negative'),
    stock: z
        .string()
        .regex(/^\d+$/, 'Stock must be a whole number')
        .transform((val) => parseInt(val)),
    category_id: z
        .string()
        .min(1, 'Category is required')
        .transform((val) => parseInt(val)),
});

const ProductForm = ({ initialData = null, categories = [] }) => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [images, setImages] = useState(
        initialData?.image_urls?.map((url, index) => ({
            id: index,
            preview: url,
            name: `Image ${index + 1}`,
        })) || []
    );

    // Initialize form with react-hook-form
    const form = useForm({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: initialData?.name || '',
            description: initialData?.description || '',
            price: initialData?.price?.toString() || '',
            stock: initialData?.stock?.toString() || '0',
            category_id: initialData?.category_id?.toString() || '',
        },
    });

    const handleSubmit = async (values) => {
        try {
            setIsSubmitting(true);

            // Transform the form data
            const productData = {
                ...values,
                price: parseFloat(values.price),
                stock: parseInt(values.stock),
                image_urls: images.map((img) => img.preview),
            };

            // Here you would make an API call to save the product
            console.log('Saving product:', productData);

            // Simulate API delay
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Navigate back to products list
            navigate('/admin/products');
        } catch (error) {
            console.error('Error saving product:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        if (window.confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
            navigate('/admin/products');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>{initialData ? 'Edit Product' : 'Add New Product'}</h1>
                    <p className={styles.subtitle}>
                        {initialData ? 'Update product details' : 'Create a new product listing'}
                    </p>
                </div>
                <div className={styles.actions}>
                    <Button variant="outline" onClick={handleCancel} disabled={isSubmitting}>
                        <X className="mr-2 h-4 w-4" />
                        Cancel
                    </Button>
                    <Button onClick={form.handleSubmit(handleSubmit)} disabled={isSubmitting}>
                        {isSubmitting ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <Save className="mr-2 h-4 w-4" />
                        )}
                        Save Product
                    </Button>
                </div>
            </div>

            <Form {...form}>
                <form className={styles.form} onSubmit={form.handleSubmit(handleSubmit)}>
                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle>Product Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Product Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Enter product name" />
                                        </FormControl>
                                        <FormDescription>Maximum 255 characters</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                placeholder="Enter product description"
                                                className="min-h-[100px]"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="price"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Price</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type="number"
                                                    step="0.01"
                                                    min="0"
                                                    placeholder="0.00"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="stock"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Stock</FormLabel>
                                            <FormControl>
                                                <Input {...field} type="number" min="0" step="1" placeholder="0" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="category_id"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Category</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a category" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {categories.map((category) => (
                                                    <SelectItem key={category.id} value={category.id.toString()}>
                                                        {category.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Product Images</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ProductImageUpload onChange={setImages} initialImages={images} />
                        </CardContent>
                    </Card>
                </form>
            </Form>
        </div>
    );
};

export default ProductForm;
