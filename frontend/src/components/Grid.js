import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addBlock } from '../features/grid/gridSlice'

const Grid = () => {
  const dispatch = useDispatch()
  const grid = useSelector(state => state.grid.grid)

  const handleGridClick = (row, col) => {
    // Dispatch action to add block at (row, col)
    dispatch(addBlock({ row, col }))
  };

  return (
    <div className="grid">
      {/* Render your grid squares here */}
      {/* Example: */}
      {Array.from({ length: 10 }).map((_, row) => (
        <div key={row} className="grid-row">
          {Array.from({ length: 10 }).map((_, col) => {
            const isBlockPresent = grid.some(block => block.row === row && block.col === col)
            return (
              <div
                key={col}
                className="grid-square"
                onClick={() => handleGridClick(row, col)}
                style={{ backgroundColor: isBlockPresent ? 'red' : 'transparent' }}
              >
                {/* Render block if present at (row, col) */}
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default Grid
