import React from 'react';


export default function Cart({ cart, onClear }) {
const total = cart.reduce((sum, e) => sum + e.product.price * e.qty, 0).toFixed(2);


return (
<aside className="cart">
<h2>Your Cart</h2>
{cart.length === 0 ? (
<p>Cart is empty</p>
) : (
<div>
<ul>
{cart.map(e => (
<li key={e.product.id}>
{e.product.title} x {e.qty} = ₹{(e.product.price * e.qty).toFixed(2)}
</li>
))}
</ul>
<p><strong>Total:</strong> ₹{total}</p>
<button onClick={onClear}>Clear Cart</button>
</div>
)}
</aside>
);
}
