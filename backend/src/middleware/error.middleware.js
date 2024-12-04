// errorHandler.js
function errorHandler(err, req, res, next) {
    // Log the error details (this could be to a file or logging service)
    console.error(err);

    // Check if it's a known error type or custom error
    if (err.name === 'ValidationError') {
        // Validation error (e.g., bad input data)
        return res.status(400).json({
            message: err.message,
            details: err.errors, // Add more details if available
        });
    } else if (err.name === 'UnauthorizedError') {
        // Unauthorized access (e.g., invalid token)
        return res.status(401).json({
            message: 'Unauthorized access',
        });
    } else if (err.name === 'NotFoundError') {
        // Resource not found
        return res.status(404).json({
            message: 'Resource not found',
        });
    } else {
        // For any other errors (internal server errors, etc.)
        return res.status(500).json({
            message: 'Something went wrong, please try again later.', // Hide stack trace in production
        });
    }
}

module.exports = errorHandler;
