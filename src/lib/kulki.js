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

export function removeMarbles(board) {
  const len = board.length;
  const visited = getInitialBoard(len);

  const vectors = [
    [0, 1], // right
    [1, 1], // right-down
    [1, 0], // down
    [1, -1], // down-left
  ];

  const inBounds = ([x, y]) => _.inRange(x, len) && _.inRange(y, len);

  const getEnd = (start, [dx, dy]) => {
    let pos = [...start];
    while (inBounds([pos[0]+dx, pos[1]+dy]) && board[pos[0]+dx][pos[1]+dy] === board[start[0]][start[1]]) {
      pos[0] += dx;
      pos[1] += dy;
    }
    return pos;
  };

  const getLen = (p, q) => Math.max(Math.abs(p[0]-q[0]), Math.abs(p[1]-q[1])) + 1;

  function* getPoints(start, [dx, dy]) {
    let pos = [...start];
    yield [...pos];
    while (inBounds([pos[0]+dx, pos[1]+dy]) && board[pos[0]+dx][pos[1]+dy] === board[start[0]][start[1]]) {
      pos[0] += dx;
      pos[1] += dy;
      yield [...pos];
    }
  }

  for (let start of cartesian(len)) {
    for (let vector of vectors) {
      const end = getEnd(start, vector);
      const n = getLen(start, end);
      if (n >= 5) {
        for (let [row, col] of getPoints(start, vector)) {
          visited[row][col] = 1;
        }
      }
    }
  }

  const newBoard = _.cloneDeep(board);

  for (let [row, col] of cartesian(len)) {
    if (visited[row][col] === 1) {
      newBoard[row][col] = 0;
    }
  }

  return newBoard;
}

export default function() {

}

