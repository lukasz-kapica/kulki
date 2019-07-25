import {
  getInitialBoard,
  longPaths,
} from '../lib/kulki';

test(`getInitialBoard returns a matrix of dimensions n x n filled with 0`, () => {
  const size = 3;
  const want = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  const got = getInitialBoard(size);
  expect(got).toEqual(want);
});

test('longPaths returns the beginnings of all paths of length at least 5', () => {
  const TestCases = [
    {
      board: [
        [1, 0, 0, 2, 1],
        [0, 1, 2, 0, 1],
        [3, 2, 1, 4, 1],
        [2, 3, 0, 1, 1],
        [0, 4, 3, 0, 1],
      ],
      want: [
        [ [0, 0], [4, 4] ],
        [ [0, 4], [4, 4] ],
      ],
    }
  ];

  TestCases.forEach(test => {
    const got = longPaths(test.board);
    expect(got).toEqual(test.want);
  });
});
