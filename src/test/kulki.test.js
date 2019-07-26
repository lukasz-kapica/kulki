import {
  getInitialBoard,
  removeMarbles,
} from '../lib/kulki';

test(`getInitialBoard returns a matrix of dimensions n x n filled with 0`, () => {
  const size = 3;
  const want = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  const got = getInitialBoard(size);
  expect(got).toEqual(want);
});

test('removes all marbles from paths of length at least 5', () => {
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
        [0, 0, 0, 2, 0],
        [0, 0, 2, 0, 0],
        [3, 2, 0, 4, 0],
        [2, 3, 0, 0, 0],
        [0, 4, 3, 0, 0],
      ],
    }
  ];

  TestCases.forEach(test => {
    const got = removeMarbles(test.board);
    expect(got).toEqual(test.want);
  });
});
