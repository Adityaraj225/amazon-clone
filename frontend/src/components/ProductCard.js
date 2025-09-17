import React from 'react';


export default function ProductCard({ product, onAdd }) {
return (
<div className="card">
<img src={product.image} alt={product.title} />
<div className="card-body">
<h3>{product.title}</h3>
<p>Rating: {product.rating} ⭐</p>
<p>Price: ₹{product.price}</p>
<button onClick={onAdd}>Add to Cart</button>
</div>
</div>
);
}
