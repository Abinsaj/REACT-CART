"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import Header from "../components/Header"
import "../styles/ProductDetails.css"
import { getProductDetails } from "../services/userAxios"
import { ArrowLeft } from "lucide-react"


const ProductDetails = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      try {
        const response = await getProductDetails(id)
        console.log(response,'this is this this thgis')
        setProduct(response)
      } catch (error) {
        console.error("Error fetching product:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])


  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="details-star filled">
          ★
        </span>,
      )
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="details-star half">
          ★
        </span>,
      )
    }

    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="details-star">
          ★
        </span>,
      )
    }

    return stars
  }

  if (loading) {
    return (
      <div className="details-page">
        <Header />
        <div className="container">
          <div className="details-loading-container">
            <div className="details-loading-spinner"></div>
            <p>Loading product details...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="details-page">
      <Header />

      <div className="details-breadcrumb">
        <div className="deails-breadcrumb-container">
          <nav className="details-breadcrumb-nav">
            <Link to="/" className="details-breadcrumb-item">
              Home
            </Link>
            <span className="details-breadcrumb-separator">›</span>
            <Link to="/" className="details-breadcrumb-item">
              {product.category}
            </Link>
            <span className="details-breadcrumb-separator">›</span>
            <span className="details-breadcrumb-item active">{product.title}</span>
          </nav>
        </div>
      </div>

      <div className="details-container">
        <ArrowLeft/>
        <div className="container">

          <div className="details-grid">

            <div className="details-images">
              <div className="details-main-image">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.title}
                  className="details-main-image-img"
                />
                <button className="details-wishlist-btn">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
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
            </div>

            {/* Product Info */}
            <div className="details-info">
              <div className="details-header">
                <div className="details-category">{product.category}</div>
                <h1 className="details-title">{product.title}</h1>
              </div>

              <div className="details-rating">
                <div className="details-stars">{renderStars(product.rating.rate)}</div>
                <span className="details-rating-text">{product.rating.count}</span>
              </div>

              <div className="details-pricing">
                <div className="details-current-price">₹{(product.price*55).toFixed(2)}</div>
              </div>

              <div className="details-description">
                <h3>Description</h3>
                <p>{product.description}</p>
              </div>

              <div className="details-actions">
                <div className="details-quantity-selector">
                  <label>Quantity:</label>
                  <div className="details-quantity-controls">
                    <button >
                      -
                    </button>
                    <span className="details-quantity">10</span>
                    <button>
                      +
                    </button>
                  </div>
                </div>

                <div className="details-action-buttons">
                  <button className="details-add-to-cart-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L5 3H2m5 10v6a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-6m-10 0h10"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Add to Cart
                  </button>

                  <button className="details-buy-now-btn">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
