import React, { useState } from 'react'
import '../styles/filtersidebar.css'
import { Star } from 'lucide-react';

const FilterSidebar = ({
    isOpen,
    onClose,
    selectedCategory,
    onCategoryChange,
    priceRange,
    onPriceRangeChange,
    selectedRating,
    onRatingChange,
    onClearFilter
}) => {
    const categories = [
        { name: "Womens Clothing", checked: true, value: `women's clothing` },
        { name: "Mens Clothing", checked: false, value: `men's clothing` },
        { name: "Electronics", checked: false, value: `electronics` },
        { name: "Jwellery", checked: false, value: `jewelery` },
    ]

    const [isCategoryOpen, setIsCategoryOpen] = useState(true)
    const [isPriceOpen, setIsPriceOpen] = useState(true)
    const [isRatingOpen, setIsRatingOpen] = useState(true)

    const ratings = [5, 4, 3, 2, 1];

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, index) => (
            <span key={index} className={index < rating ? "star filled" : "star"}>
                ★
            </span>
        ))
    }

    return (
        <>
            {isOpen && <div className="mobile-overlay" onClick={onClose}></div>}

            <div className={`filter-sidebar ${isOpen ? "mobile-open" : ""}`}>
                <div className="mobile-filter-header">
                    <h3>Filters</h3>
                    <button className="mobile-filter-close" onClick={onClose}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M18 6L6 18M6 6l12 12"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                </div>

                <div className="filter-header">
                    <h3>Filter</h3>
                    <span className="advanced-link" onClick={()=>onClearFilter()}>Clear</span>
                </div>

                <div className="filter-section">
                    <div className="filter-section-header" onClick={() => setIsCategoryOpen(!isCategoryOpen)}>
                        <h4>Category</h4>
                    </div>
                    {isCategoryOpen && (

                        <div className="filter-content">
                            <div className="search-brands">
                                <input type="text" placeholder="Search brand..." className="brand-search-input" />
                            </div>

                            <div className="brand-list">
                                {categories.map((category) => (
                                    <label className="brand-item">
                                        <span className="brand-name">{category.name}</span>

                                        <input type="checkbox"
                                            checked={selectedCategory === category.value}
                                            onChange={() => onCategoryChange(category.value)}
                                        />
                                        <span className="checkmark"></span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="filter-section">
                    <div className="filter-section-header" onClick={() => setIsPriceOpen(!isPriceOpen)}>
                        <h4>Price</h4>
                        <svg className={`chevron ${isPriceOpen ? "open" : ""}`} width="12" height="12" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M6 9l6 6 6-6"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                    {isPriceOpen && (

                        <div className="filter-content">
                            <div className="price-range">
                                <div className="price-chart">
                                    <div className="chart-bars">
                                        {[30, 50, 70, 90, 100, 80, 60, 40, 55, 75, 85, 95].map((height, index) => (
                                            <div key={index} className="chart-bar" style={{ height: `${height}%` }}></div>
                                        ))}
                                    </div>
                                </div>

                                <div className="price-slider-container">
                                    <div className="price-slider">
                                        <input
                                            type="range"
                                            min="0"
                                            max="50000"
                                            value={priceRange[0]}
                                            onChange={(e) => onPriceRangeChange([Number.parseInt(e.target.value), priceRange[1]])}
                                            className="range-input range-min"
                                        />
                                        <input
                                            type="range"
                                            min="0"
                                            max="50000"
                                            value={priceRange[1]}
                                            onChange={(e) => onPriceRangeChange([priceRange[0], Number.parseInt(e.target.value)])}
                                            className="range-input range-max"
                                        />
                                    </div>
                                </div>

                                <div className="price-labels">
                                    <span>₹{priceRange[0].toLocaleString()} INR</span>
                                    <span>₹{priceRange[1].toLocaleString()} INR</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="filter-section">
                    <div className="filter-section-header" onClick={() => setIsRatingOpen(!isRatingOpen)}>
                        <h4>Rating</h4>
                        <svg className="chevron" width="12" height="12" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M6 9l6 6 6-6"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>

                    {isRatingOpen && (
                        <div className="rating-options-grid">
                            {ratings.map((rating) => (
                                <button
                                    key={rating}
                                    className={`rating-box ${selectedRating === rating ? 'active' : ''}`}
                                    onClick={() => onRatingChange(rating)}
                                >
                                    {renderStars(rating)}
                                </button>
                            ))}
                        </div>
                    )}
                </div>



                <div className="mobile-filter-actions">
                    <button className="apply-filters-btn" onClick={onClose}>
                        Apply Filters
                    </button>
                </div>
            </div>
        </>
    )
}

export default FilterSidebar
