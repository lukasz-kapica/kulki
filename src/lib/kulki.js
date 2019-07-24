import _ from 'lodash';

export function getInitialBoard(size) {
  return new Array(size).fill(0)
    .map(() => new Array(size).fill(0));
}

export function getRandomBoard(size, colors) {
  const board = getInitialBoard(size);
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      board[row][col] = Math.floor(Math.random() * 100) % (colors+1);
    }
  }
  return board;
}

const getRandomTriple = (colors = 5) => _.times(3, () => _.random(1, colors+1));

export function getInitialState(size = 9, colors = 5) {
  const zeroState = {
    score: 0,
    board: getInitialBoard(size, colors),
    next3: getRandomTriple(colors),
    active: null,
  };

  return populate(zeroState);
}

function cartesian(n) {
  const res = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      res.push([i, j]);
    }
  }
  return res;
}

function getFreeTiles(board, n) {
  const allFree =
    cartesian(board.length)
    .filter(([row, col]) => board[row][col] === 0);

  return _.shuffle(allFree).slice(0, n);
}

export function populate(state) {
  const newState = _.cloneDeep(state);
  const {next3} = state;
  const freeTiles = getFreeTiles(state.board, 3);
  freeTiles.forEach(([row, col], i) => newState.board[row][col] = next3[i]);
  newState.next3 = getRandomTriple();
  return newState;
}

export function startsFrom(board, row, col) {}

export function establish(state) {
  const newState = _.cloneDeep(state);
  const toRemove = [];
  for (let [row, col] of cartesian(state.board.length)) {
    if (startsFrom(state.board, row, col)) {
      toRemove.push([row, col])
    }
  }

}

export default function() {

}

