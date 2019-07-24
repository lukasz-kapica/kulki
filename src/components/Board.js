import React from 'react';
import _ from 'lodash';

function Board({ board, active, onClick }) {
  return (
    <div className="Board">
      {[...yieldCells(board, onClick, active)]}
    </div>
  );
}

function Cell({
  row = 0,
  col = 0,
  value = 0,
  onClick = _.noop,
  active = false,
}) {
  const colorClass = ` color-${value}`;
  const handleClick = () => onClick(row, col);
  const activeClassName = active ? ' active' : '';

  return (
    <div className={`Cell${activeClassName}`} onClick={handleClick}>
      {!!value && <div className={`marble${colorClass}${activeClassName}`} />}
    </div>
  );
}

function* yieldCells(board, handleClick, active) {
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board.length; col++) {
      yield <Cell
        key={`${row},${col}`}
        onClick={handleClick}
        row={row} col={col}
        value={board[row][col]}
        active={active && active[0] === row && active[1] === col}
      />;
    }
  }
}

export function Next3({ next3 }) {
  return (
    <div className="Next3">
      {next3.map((color, idx) => <Cell key={idx} value={color} />)}
    </div>
  );
}

export default Board;
