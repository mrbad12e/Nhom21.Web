// ProductImageUpload.jsx
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
    Card,
    CardContent,
} from '@/components/ui/card';
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
import {
    Trash2,
    Upload,
    X,
    Image as ImageIcon,
    AlertCircle
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import styles from './ProductImageUpload.module.css';

const MAX_FILES = 5;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_TYPES = {
    'image/jpeg': ['.jpg', '.jpeg'],
    'image/png': ['.png'],
    'image/webp': ['.webp']
};

const ProductImageUpload = ({ onChange, initialImages = [] }) => {
    const [images, setImages] = useState(initialImages);
    const [error, setError] = useState(null);
    const [imageToDelete, setImageToDelete] = useState(null);

    const validateFile = (file) => {
        if (!Object.keys(ACCEPTED_TYPES).includes(file.type)) {
            return 'File type not supported. Please upload JPG, PNG, or WebP images.';
        }
        if (file.size > MAX_FILE_SIZE) {
            return 'File size too large. Maximum size is 5MB.';
        }
        return null;
    };

    const handleDrop = useCallback((acceptedFiles) => {
        setError(null);

        // Validate total number of files
        if (images.length + acceptedFiles.length > MAX_FILES) {
            setError(`Maximum ${MAX_FILES} images allowed`);
            return;
        }

        // Process and validate each file
        const newImages = acceptedFiles.map(file => {
            const error = validateFile(file);
            if (error) {
                setError(error);
                return null;
            }

            return {
                id: `temp-${Date.now()}-${file.name}`,
                file,
                preview: URL.createObjectURL(file),
                name: file.name,
                size: file.size,
                type: file.type,
                progress: 0,
                status: 'queued'
            };
        }).filter(Boolean);

        if (newImages.length > 0) {
            const updatedImages = [...images, ...newImages];
            setImages(updatedImages);
            onChange?.(updatedImages);
        }
    }, [images, onChange]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: handleDrop,
        accept: ACCEPTED_TYPES,
        maxFiles: MAX_FILES - images.length,
        maxSize: MAX_FILE_SIZE,
        disabled: images.length >= MAX_FILES
    });

    const handleDelete = useCallback((image) => {
        if (image.preview) {
            URL.revokeObjectURL(image.preview);
        }
        const updatedImages = images.filter(img => img.id !== image.id);
        setImages(updatedImages);
        onChange?.(updatedImages);
        setImageToDelete(null);
    }, [images, onChange]);

    const handleSort = useCallback((dragIndex, hoverIndex) => {
        const draggedImage = images[dragIndex];
        const newImages = [...images];
        newImages.splice(dragIndex, 1);
        newImages.splice(hoverIndex, 0, draggedImage);
        setImages(newImages);
        onChange?.(newImages);
    }, [images, onChange]);

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div className={styles.container}>
            <Label className={styles.label}>
                Product Images
                <span className={styles.maxFiles}>
                    {images.length}/{MAX_FILES} images
                </span>
            </Label>

            {/* Dropzone Area */}
            <div
                {...getRootProps()}
                className={styles.dropzone}
                data-active={isDragActive}
                data-disabled={images.length >= MAX_FILES}
            >
                <input {...getInputProps()} />
                <div className={styles.dropzoneContent}>
                    <Upload className={styles.uploadIcon} />
                    <div className={styles.dropzoneText}>
                        {isDragActive ? (
                            <p>Drop the files here...</p>
                        ) : (
                            <>
                                <p>Drag & drop images here, or click to select</p>
                                <p className={styles.dropzoneSubtext}>
                                    JPG, PNG, or WebP, up to 5MB each
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <Alert variant="destructive" className={styles.error}>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {/* Image Preview Grid */}
            {images.length > 0 && (
                <div className={styles.previewGrid}>
                    {images.map((image, index) => (
                        <Card key={image.id} className={styles.imageCard}>
                            <CardContent className={styles.imageCardContent}>
                                <div className={styles.imageWrapper}>
                                    {image.preview ? (
                                        <img
                                            src={image.preview}
                                            alt={image.name}
                                            className={styles.preview}
                                        />
                                    ) : (
                                        <div className={styles.placeholderWrapper}>
                                            <ImageIcon className={styles.placeholderIcon} />
                                        </div>
                                    )}
                                    <div className={styles.imageOverlay}>
                                        <Button
                                            variant="destructive"
                                            size="icon"
                                            className={styles.deleteButton}
                                            onClick={() => setImageToDelete(image)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                                <div className={styles.imageInfo}>
                                    <p className={styles.imageName}>{image.name}</p>
                                    <p className={styles.imageSize}>
                                        {formatFileSize(image.size)}
                                    </p>
                                </div>
                                {image.status === 'uploading' && (
                                    <div className={styles.progressWrapper}>
                                        <div
                                            className={styles.progressBar}
                                            style={{ width: `${image.progress}%` }}
                                        />
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            {/* Delete Confirmation Dialog */}
            <AlertDialog
                open={!!imageToDelete}
                onOpenChange={() => setImageToDelete(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Image</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete this image? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => imageToDelete && handleDelete(imageToDelete)}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default ProductImageUpload;