const express = require('express');
const fs = require('fs').promises;
const path = require('path');
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

// Data directory
const dataDir = path.join(__dirname, 'data');

// Ensure data directory exists
const initializeDataDir = async () => {
    try {
        await fs.mkdir(dataDir, { recursive: true });
    } catch (error) {
        console.error("Error creating data directory:", error);
    }
};

// Generic data functions
const saveData = async (filename, data) => {
    const filePath = path.join(dataDir, `${filename}.json`);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
};

const loadData = async (filename, defaultData = []) => {
    const filePath = path.join(dataDir, `${filename}.json`);
    try {
        const fileContent = await fs.readFile(filePath, 'utf8');
        return JSON.parse(fileContent);
    } catch (error) {
        if (error.code === 'ENOENT') {
            const dataToSave = Array.isArray(defaultData) 
                ? { [filename]: defaultData }
                : defaultData;
            await saveData(filename, dataToSave);
            return dataToSave;
        }
        console.error(`Error loading data for ${filename}:`, error);
        throw error;
    }
};

// === API Endpoints for Scholarships (ONLY) ===

app.post('/api/scholarships', async (req, res) => {
    try {
        const data = await loadData('scholarships', []);
        const newScholarship = {
            id: 'sch_' + Date.now(),
            ...req.body,
            timestamp: new Date().toISOString()
        };
        data.scholarships.push(newScholarship);
        await saveData('scholarships', data);
        res.status(201).json(newScholarship);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.get('/api/scholarships', async (req, res) => {
    try {
        const data = await loadData('scholarships', []);
        res.json(data.scholarships);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// GET a specific scholarship by ID
app.get('/api/scholarships/:id', async (req, res) => {
    try {
        const data = await loadData('scholarships', []);
        const scholarship = data.scholarships.find(s => s.id === req.params.id);
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
        const { scholarships } = req.body;
        if (!Array.isArray(scholarships)) {
            return res.status(400).json({ error: 'scholarships must be an array' });
        }
        const data = { scholarships };
        await saveData('scholarships', data);
        res.status(201).json({ message: 'Scholarships batch saved successfully', count: scholarships.length });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

const PORT = 3001;

// Start the server
const startServer = async () => {
    await initializeDataDir();
    app.listen(PORT, () => {
        console.log(`\n✅ Scholarship Calculator Server running on port ${PORT}`);
        console.log(`📁 Data files will be saved in: ${dataDir}`);
        console.log(`🌐 Available at: http://localhost:${PORT}`);
        console.log(`📊 API endpoints:`);
        console.log(`   POST /api/scholarships`);
        console.log(`   GET /api/scholarships`);
        console.log(`   GET /api/scholarships/:id`);
        console.log(`\n⌨️  Press Ctrl+C to stop the server\n`);
    });
};

startServer().catch(error => {
    console.error('Failed to start server:', error);
    process.exit(1);
});
