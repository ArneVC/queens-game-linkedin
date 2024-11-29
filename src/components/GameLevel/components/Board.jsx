import React, { useState } from "react";
import Square from "./Square";
import useGridSize from "../../../hooks/useGridSize";
import { levels } from "../../../utils/levels";

const Board = ({
  board,
  handleClick,
  level,
  showClashingQueens,
  clashingQueens,
}) => {
  const { gridSize } = useGridSize(board.length);

  const colorRegions = levels[level].colorRegions;

  const [isMouseDown, setIsMouseDown] = useState(false);

  return (
    <div
      className="board"
      style={{
        gridTemplateColumns: `repeat(${board.length}, ${gridSize})`,
        gridTemplateRows: `repeat(${board.length}, ${gridSize})`,
      }}
      onMouseDown={() => setIsMouseDown(true)}
      onMouseUp={() => setIsMouseDown(false)}
    >
      {board.map((row, rowIndex) =>
        row.map((square, colIndex) => (
          <Square
            key={`${rowIndex}-${colIndex}`}
            row={rowIndex}
            col={colIndex}
            value={square}
            region={colorRegions[rowIndex][colIndex]}
            onClick={() => {
              handleClick(rowIndex, colIndex);
            }}
            onMouseOver={() => {
              if(isMouseDown) {
                console.log("dragging over: " + rowIndex + ", " + colIndex);
              }              
            }}
            level={level}
            isClashing={
              showClashingQueens &&
              clashingQueens.has(`${rowIndex},${colIndex}`)
            }
          />
        ))
      )}
    </div>
  );
};

export default Board;
