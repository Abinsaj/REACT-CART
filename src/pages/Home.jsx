import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import FilterSidebar from '../components/FilterSidebar'
import SortDropDown from '../components/SortDropDown'
import ProductGrid from '../components/ProductGrid'
import Pagination from '../components/Pagination'
import '../styles/home.css'
import { getProducts } from '../services/userAxios'
import { Filter } from 'lucide-react'

const Home = () => {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedCategory, setSelectedCategory] = useState("")
    const [priceRange, setPriceRange] = useState([0, 50000])
    const [selectedRating, setSelectedRating] = useState(0)
    const [searchTerm, setSearchTerm] = useState("")
    const [filteredProducts, setFilteredProducts] = useState([])
    const [sortBy, setSortBy] = useState("popular")
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const productsPerPage = 6


    useEffect(() => {
        fetchProducts()
    }, [])

    useEffect(()=>{
        filterAndSortProduct()
    },[products, searchTerm, selectedCategory, priceRange, selectedRating, sortBy])

    const fetchProducts = async () => {
        try {
            const response = await getProducts()
            setProducts(response)
        } catch (error) {
            console.log('Error fetching products :', error)
        } finally {
            setLoading(false)
        }
    }

    const handleFilterToggle = () => {
        setIsFilterOpen(!isFilterOpen)
      }
    
      const handleFilterClose = () => {
        setIsFilterOpen(false)
      }

    const filterAndSortProduct = () => {
        let filtered = [...products]

        if (searchTerm) {
            console.log(searchTerm, 'khflkahlkahla');
            filtered = filtered.filter(
              (product) =>
                product.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
          }

        if (selectedCategory) {
            filtered = filtered.filter((product) => product.category.includes(selectedCategory))
        }

        filtered = filtered.filter((product) => {
            const priceInINR = product.price * 55
            return priceInINR >= priceRange[0] && priceInINR <= priceRange[1]
        })

        if (selectedRating > 0) {
            filtered = filtered.filter((product) => (product.rating?.rate || 4.5) >= selectedRating)
          }
      
          filtered.sort((a, b) => {
            switch (sortBy) {
              case "price-low":
                return a.price - b.price
              case "price-high":
                return b.price - a.price
              case "rating":
                return (b.rating?.rate || 4.5) - (a.rating?.rate || 4.5)
              case "newest":
                return b.id - a.id
              default: 
                return (b.rating?.count || 121) - (a.rating?.count || 121)
            }
          })

        setFilteredProducts(filtered)
        setCurrentPage(1)

    }

    const handleSearch = (term) => {
        setSearchTerm(term)
    }

    const handleCategoryChange = (category) => {
        setSelectedCategory(selectedCategory === category ? "" : category)
    }

    const handlePriceRangeChange = (range) => {
        setPriceRange(range)
    }

    const handleRatingChange = (rating) => {
        setSelectedRating(selectedRating === rating ? 0 : rating)
    }

    const handleSortChange = (sort) => {
        setSortBy(sort)
      }

    const handlePageChange = (page) => {
        setCurrentPage(page)
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
    const startIndex = (currentPage - 1) * productsPerPage
    const endIndex = startIndex + productsPerPage
    const currentProducts = filteredProducts.slice(startIndex, endIndex)


    return (
        <>
            <div className="home">
                <Header onSearch={handleSearch} searchTerm={searchTerm} />

                <div className="hero-section">
                    <div className="hero-content">
                        <div className="container"></div>
                    </div>
                </div>

                <div className="breadcrumb">
                    <div className="container">
                        <nav className="breadcrumb-nav">
                            <span className="breadcrumb-item active">Home</span>
                            <span className="breadcrumb-separator">›</span>
                            <span className="breadcrumb-item">Clothes</span>
                        </nav>
                    </div>
                </div>

                <div className="main-content">
                    <div className="container">
                        <div className="content-layout">
                            <FilterSidebar
                                isOpen={isFilterOpen} 
                                onClose={handleFilterClose}
                                selectedCategory={selectedCategory}
                                onCategoryChange={handleCategoryChange}
                                priceRange={priceRange}
                                onPriceRangeChange={handlePriceRangeChange}
                                selectedRating={selectedRating}
                                onRatingChange={handleRatingChange}
                            />

                            <div className="products-section">
                                <div className="products-header">
                                    <div className="products-controls">
                                        <div className="view-controls">
                                            <button className="view-btn active">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                                    <rect x="3" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2" />
                                                    <rect x="14" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2" />
                                                    <rect x="3" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2" />
                                                    <rect x="14" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2" />
                                                </svg>
                                            </button>
                                            <button className="view-btn" onClick={handleFilterToggle}>
                                               <Filter />
                                            </button>
                                        </div>

                                        <SortDropDown sortBy={sortBy} onSortChange={handleSortChange}/>
                                    </div>
                                </div>

                                <ProductGrid productData={currentProducts} />
                                {totalPages > 1 && (
                                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
