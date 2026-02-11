
import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;
const DATA_FILE = path.join(__dirname, 'db.json');

app.use(cors());
app.use(express.json());

// Initialize database file if it doesn't exist
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify({
    products: [],
    blogs: [],
    enquiries: [],
    siteConfig: {}
  }));
}

// Helper to read/write
const getData = () => JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
const saveData = (data) => fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

// API Routes
app.get('/api/state', (req, res) => {
  res.json(getData());
});

app.post('/api/enquiries', (req, res) => {
  const data = getData();
  const newEnquiry = { ...req.body, id: Date.now().toString(), timestamp: new Date().toISOString(), status: 'New' };
  data.enquiries.unshift(newEnquiry);
  saveData(data);
  res.status(201).json(newEnquiry);
});

app.post('/api/enquiries/status', (req, res) => {
  const { id, status } = req.body;
  const data = getData();
  data.enquiries = data.enquiries.map(e => e.id === id ? { ...e, status } : e);
  saveData(data);
  res.json({ success: true });
});

app.post('/api/products', (req, res) => {
  const data = getData();
  data.products = req.body;
  saveData(data);
  res.json({ success: true });
});

app.post('/api/blogs', (req, res) => {
  const data = getData();
  data.blogs = req.body;
  saveData(data);
  res.json({ success: true });
});

app.post('/api/config', (req, res) => {
  const data = getData();
  data.siteConfig = req.body;
  saveData(data);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`\x1b[32m%s\x1b[0m`, `✓ Deccan Tadka Backend running on http://localhost:${PORT}`);
});
