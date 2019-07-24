import React, { useState } from 'react';
import _ from 'lodash';

import Board, {Next3} from './Board';

import {getInitialState, populate} from '../lib/kulki';

function Kulki({
  size = 9,
  colors = 5,
  initialState = getInitialState(size, colors),
}) {
  const [state, setState] = useState(initialState);

  const {active, board} = state;

  const setActive = newActive => setState({...state, active: newActive});

  const handleStartOver = () => {
    setState(getInitialState(size, colors));
  };

  const handleMove = (from, to) => {
    const newState = _.cloneDeep(state);
    newState.board[to[0]][to[1]] = newState.board[from[0]][from[1]];
    newState.board[from[0]][from[1]] = 0;
    newState.active = null;
    setState(populate(newState));
  };

  const handleClick = (row, col) => {
    if (active === null && board[row][col] !== 0) {
      setActive([row, col]);
    }
    else if (board[row][col] === 0 && active !== null ) {
      handleMove(active, [row, col]);
    }
    else if (active !== null && !_.isEqual(active, [row, col])){
      setActive([row, col]);
    }
    else {
      setActive(null);
    }
  };

  console.log(state.next3);

  return (
    <div className="Kulki">
      <h1>Kulki</h1>
      <div className="dashboard">
        <button onClick={handleStartOver}>Start Over</button>
        <h3>Score: {state.score}</h3>
        <Next3 next3={state.next3} />
      </div>
      <Board
        board={state.board}
        active={state.active}
        onClick={handleClick}
      />
    </div>
  );
}

export default Kulki;
