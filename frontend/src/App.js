import React, { useEffect, useState } from 'react';
import { fetchProducts, addToCart, getCart, clearCart } from './api';
import ProductList from './components/ProductList';
import Cart from './components/Cart';


const SESSION_ID = 'demo-session';


function App() {
const [products, setProducts] = useState([]);
const [cart, setCart] = useState([]);


useEffect(() => {
(async () => {
const data = await fetchProducts();
setProducts(data);
const c = await getCart(SESSION_ID);
setCart(c.cart || []);
})();
}, []);


async function handleAddToCart(productId) {
const res = await addToCart(SESSION_ID, productId, 1);
setCart(res.cart);
}


async function handleClearCart() {
const res = await clearCart(SESSION_ID);
setCart(res.cart);
}


return (
<div className="container">
<header className="header">
<h1>Amazon Clone</h1>
<div className="cart-summary">
<strong>Cart:</strong> {cart.reduce((s, c) => s + c.qty, 0)} items
</div>
</header>


<main className="main">
<ProductList products={products} onAdd={handleAddToCart} />
<Cart cart={cart} onClear={handleClearCart} />
</main>


<footer className="footer">Made for portfolio • Demo only</footer>
</div>
);
}


export default App;
