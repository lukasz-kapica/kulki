import {
  getInitialBoard,
} from '../lib/kulki';

test(`getInitialBoard returns a matrix of dimensions n x n filled with 0`, () => {
  const size = 3;
  const want = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  const got = getInitialBoard(size);
  expect(got).toEqual(want);
});
