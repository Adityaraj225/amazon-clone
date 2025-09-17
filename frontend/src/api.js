const BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';


export async function fetchProducts() {
const res = await fetch(`${BASE}/api/products`);
return res.json();
}


export async function addToCart(sessionId, productId, qty = 1) {
const res = await fetch(`${BASE}/api/cart`, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ sessionId, productId, qty })
});
return res.json();
}


export async function getCart(sessionId) {
const res = await fetch(`${BASE}/api/cart?sessionId=${sessionId}`);
return res.json();
}


export async function clearCart(sessionId) {
const res = await fetch(`${BASE}/api/cart`, {
method: 'DELETE',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ sessionId })
});
return res.json();
}
