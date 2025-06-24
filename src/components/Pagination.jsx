import React from 'react'
import '../styles/pagination.css'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {

    const getVisiblePages = () => {
        const pages = []
        const maxVisible = 5
    
        if (totalPages <= maxVisible) {
          for (let i = 1; i <= totalPages; i++) {
            pages.push(i)
          }
        } else {
          if (currentPage <= 3) {
            for (let i = 1; i <= 4; i++) {
              pages.push(i)
            }
            pages.push("...")
            pages.push(totalPages)
          } else if (currentPage >= totalPages - 2) {
            pages.push(1)
            pages.push("...")
            for (let i = totalPages - 3; i <= totalPages; i++) {
              pages.push(i)
            }
          } else {
            pages.push(1)
            pages.push("...")
            for (let i = currentPage - 1; i <= currentPage + 1; i++) {
              pages.push(i)
            }
            pages.push("...")
            pages.push(totalPages)
          }
        }
    
        return pages
      }

      const visiblePages = getVisiblePages()

  return (
    <>
    <div className="pagination">
    <button
        className="pagination-btn prev"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path
            d="M15 18l-6-6 6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div className="pagination-numbers">
      {visiblePages.map((page, index) => (
          <React.Fragment key={index}>
            {page === "..." ? (
              <span className="pagination-ellipsis">...</span>
            ) : (
              <button
                className={`pagination-number ${currentPage === page ? "active" : ""}`}
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}
      </div>

      <button
        className="pagination-btn next"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
    </>
  )
}

export default Pagination
