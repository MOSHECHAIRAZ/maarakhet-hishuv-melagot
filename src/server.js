require('dotenv').config();
const express = require('express');
const path = require('path');
const scholarshipService = require('./services/scholarshipService');
const { validateScholarship, validateScholarshipBatch } = require('./validators/scholarshipValidator');
const logger = require('./utils/logger');
const errorHandler = require('./middleware/errorHandler');
const app = express();

app.use(express.json());

// Async error handler wrapper
const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

// Serve static files
app.use(express.static(path.join(process.cwd(), 'public')));

// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// === API Endpoints for Scholarships (ONLY) ===

app.post('/api/scholarships', asyncHandler(async (req, res) => {
    const validatedData = validateScholarship(req.body);
    const newScholarship = await scholarshipService.create(validatedData);
    res.status(201).json(newScholarship);
}));

app.get('/api/scholarships', asyncHandler(async (req, res) => {
    const scholarships = await scholarshipService.getAll();
    res.json(scholarships);
}));

// GET a specific scholarship by ID
app.get('/api/scholarships/:id', asyncHandler(async (req, res) => {
    const scholarship = await scholarshipService.getById(req.params.id);
    if (!scholarship) {
        return res.status(404).json({ error: 'Scholarship not found' });
    }
    res.json(scholarship);
}));

// POST batch of scholarships
app.post('/api/scholarships-batch', asyncHandler(async (req, res) => {
    const validatedData = validateScholarshipBatch(req.body.scholarships);
    await scholarshipService.saveBatch(validatedData);
    res.status(201).json({ message: 'Scholarships batch saved successfully', count: validatedData.length });
}));

const PORT = process.env.PORT || 3001;

// Use the error handler as the last middleware
app.use(errorHandler);

// Start the server
const startServer = async () => {
    await scholarshipService.initialize();
    app.listen(PORT, () => {
        logger.info(`Scholarship Calculator Server running on port ${PORT}`);
        logger.info(`Data files will be saved in: ${path.join(process.cwd(), process.env.DATA_DIR || 'data', 'db')}`);
        logger.info(`Available at: http://localhost:${PORT}`);
        logger.info(`API endpoints: POST /api/scholarships, GET /api/scholarships, GET /api/scholarships/:id, POST /api/scholarships-batch`);
        logger.info(`Press Ctrl+C to stop the server`);
    });
};

startServer().catch(error => {
    console.error('Failed to start server:', error);
    process.exit(1);
});
