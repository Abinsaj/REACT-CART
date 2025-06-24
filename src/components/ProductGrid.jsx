import React from 'react'
import ProductCard from './ProductCard'
import '../styles/productgrid.css'

const ProductGrid = ({ productData }) => {
    return (
        <>
            <div className="product-grid">
                {productData && productData.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}

            </div>
        </>
    )
}

export default ProductGrid
