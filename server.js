require('dotenv').config();
const express = require('express');
const path = require('path');
const scholarshipService = require('./services/scholarshipService');
const { validateScholarship, validateScholarshipBatch } = require('./validators/scholarshipValidator');
const app = express();

app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// === API Endpoints for Scholarships (ONLY) ===

app.post('/api/scholarships', async (req, res) => {
    try {
        const validatedData = validateScholarship(req.body);
        const newScholarship = await scholarshipService.create(validatedData);
        res.status(201).json(newScholarship);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.get('/api/scholarships', async (req, res) => {
    try {
        const scholarships = await scholarshipService.getAll();
        res.json(scholarships);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// GET a specific scholarship by ID
app.get('/api/scholarships/:id', async (req, res) => {
    try {
        const scholarship = await scholarshipService.getById(req.params.id);
        if (!scholarship) {
            return res.status(404).json({ error: 'Scholarship not found' });
        }
        res.json(scholarship);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// POST batch of scholarships
app.post('/api/scholarships-batch', async (req, res) => {
    try {
        const validatedData = validateScholarshipBatch(req.body.scholarships);
        await scholarshipService.saveBatch(validatedData);
        res.status(201).json({ message: 'Scholarships batch saved successfully', count: validatedData.length });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

const PORT = process.env.PORT || 3001;

// Start the server
const startServer = async () => {
    await scholarshipService.initialize();
    app.listen(PORT, () => {
        console.log(`\n✅ Scholarship Calculator Server running on port ${PORT}`);
        console.log(`📁 Data files will be saved in: ${path.join(__dirname, 'data')}`);
        console.log(`🌐 Available at: http://localhost:${PORT}`);
        console.log(`📊 API endpoints:`);
        console.log(`   POST /api/scholarships`);
        console.log(`   GET /api/scholarships`);
        console.log(`   GET /api/scholarships/:id`);
        console.log(`   POST /api/scholarships-batch`);
        console.log(`\n⌨️  Press Ctrl+C to stop the server\n`);
    });
};

startServer().catch(error => {
    console.error('Failed to start server:', error);
    process.exit(1);
});
