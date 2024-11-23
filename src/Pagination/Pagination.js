import React from 'react'

function Pagination({ NumberMovi, totalMovi }) {
  const pageNumbers = []
  for (let i = 1; i <= totalMovi / NumberMovi; i++) {
    pageNumbers.push(i)
  }
  return (
    <div>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="pagination-item">
            {number}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Pagination
