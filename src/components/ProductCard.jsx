import React from 'react'
import '../styles/productcard.css'
import { useNavigate } from 'react-router-dom'


const renderStars = (rating) => {


    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="star filled">
          ★
        </span>,
      )
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="star half">
          ★
        </span>,
      )
    }

    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="star">
          ★
        </span>,
      )
    }

    return stars
  }

const ProductCard = ({ product }) => {

  const navigate = useNavigate()


    return (
        <>
            <div className="product-card" onClick={()=>navigate(`/product/${product.id}`)}>
                <div className="product-image-container">
                    <img src={product.image} alt="TDX Sinkers" className="product-image" />
                    <button className="wishlist-btn">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                </div>

                <div className="product-info">
                    <h3 className="product-title">{product.title}</h3>
                    <p className="product-description">{product.description.split(' ').length > 15
                        ? product.description.split(' ').slice(0, 15).join(' ') + '...'
                        : product.description}</p>

                    <div className="product-price">₹ {(product.price*55).toFixed(2)}</div>

                    <div className="product-rating">
                        <div className="stars">{renderStars(product.rating?.rate)}</div>
                        <span className="rating-count">({product.rating?.count})</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductCard
