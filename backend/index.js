const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');


const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


const productsPath = path.join(__dirname, 'data', 'products.json');


function readProducts() {
const raw = fs.readFileSync(productsPath);
return JSON.parse(raw);
}


// GET /api/products - list products
app.get('/api/products', (req, res) => {
const products = readProducts();
res.json(products);
});


// Simple cart kept in memory (for demo only)
let carts = {}; // keyed by session id (simple)


// POST /api/cart - body: { sessionId, productId, qty }
app.post('/api/cart', (req, res) => {
const { sessionId = 'anonymous', productId, qty = 1 } = req.body;
if (!productId) return res.status(400).json({ error: 'productId required' });


const products = readProducts();
const product = products.find(p => p.id === Number(productId));
if (!product) return res.status(404).json({ error: 'product not found' });


if (!carts[sessionId]) carts[sessionId] = [];
const entry = carts[sessionId].find(e => e.product.id === product.id);
if (entry) entry.qty += qty;
else carts[sessionId].push({ product, qty });


res.json({ cart: carts[sessionId] });
});


// GET /api/cart?sessionId=...
app.get('/api/cart', (req, res) => {
const sessionId = req.query.sessionId || 'anonymous';
const cart = carts[sessionId] || [];
res.json({ cart });
});


// DELETE /api/cart - body: { sessionId }
app.delete('/api/cart', (req, res) => {
const { sessionId = 'anonymous' } = req.body;
carts[sessionId] = [];
res.json({ cart: [] });
});


app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
