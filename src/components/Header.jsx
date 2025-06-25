import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/header.css'
import { User, Search, ShoppingCart } from 'lucide-react'

const Header = ({ onSearch, searchTerm }) => {
    const [showMobileSearch, setShowMobileSearch] = useState(false)

    return (
        <>
            <header className="header">
                <div className="header-container">
                    <div className="header-left">
                        <div className="logo-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <circle cx="12" cy="12" r="10" fill="#007bff" />
                                <path d="M8 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <span className="logo-text">REACTCART</span>

                    </div>

                    <div className="header-center">
                        <div className="search-container">
                            <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <circle cx="11" cy="11" r="8" stroke="#6b7280" strokeWidth="2" />
                                <path d="m21 21-4.35-4.35" stroke="#6b7280" strokeWidth="2" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search Here..."
                                className="search-input"
                                value={searchTerm}
                                onChange={(e)=>onSearch(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="header-right">
                        <div className="nav-items desktop-nav">
                            <div className="nav-item dropdown">
                                <span>Zoffi</span>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                                    <path
                                        d="M6 9l6 6 6-6"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                            <span className='nav-item'>Become a seller</span>
                            <div className="nav-item dropdown">
                                <span>More</span>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                                    <path
                                        d="M6 9l6 6 6-6"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                            <span className='nav-item'>Cart</span>
                        </div>

                        <div className="mobile-nav">
                            <Search
                                onClick={() => setShowMobileSearch(!showMobileSearch)}
                            />
                            <User />
                            <ShoppingCart />
                        </div>
                    </div>
                </div>
                {showMobileSearch && (
                    <div className="mobile-search-container">
                        <input
                            type="text"
                            placeholder="Search here..."
                            className="mobile-search-input"
                            value={searchTerm}
                            onChange={(e)=>onSearch(e.target.value)}
                        />
                    </div>
                )}
            </header>
        </>
    )
}

export default Header
