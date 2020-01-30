solver = require('./boggle_solver.js')

describe('null cases', () => {
  test(`no grid`, () => {
    expect(solver.findAllSolutions(undefined, [])).toStrictEqual([])
  })
  test(`no dictionary`, () => {
    expect(solver.findAllSolutions([["a", "b", "c"]], undefined)).toStrictEqual([])
  })
  test(`empty dictionary`, () => {
    expect(solver.findAllSolutions([["a", "b", "c"]], [])).toStrictEqual([])
  })
  test(`empty grid`, () => {
    expect(solver.findAllSolutions([], ["", "abc"])).toStrictEqual([])
  })
  test(`empty rows`, () => {
    expect(solver.findAllSolutions([[], []], ["", "abc"])).toStrictEqual([])
  })
  test(`empty letters`, () => {
    expect(solver.findAllSolutions([["a", "", "b", "c"]], ["abc"])).toStrictEqual(["abc"])
  })
})

describe('meets requirements for normal cases', () => {
  test(`short words`, () => {
    expect(solver.findAllSolutions([["a", "a", "a"], ["b", "b", "b"]], ["aaa", "bb"])).toStrictEqual(["aaa"])
  })
  test(`doesn't reuse letters`, () => {
    expect(solver.findAllSolutions([["a", "b", "c"]], ["abc", "cba", "aaa", "aba", "bab"]).sort()).toStrictEqual(["abc", "cba"])
  })
  test(`letters can have multiple characters`, () => {
    expect(solver.findAllSolutions([["Qu", "a", "r", "k"]], ["Quark"])).toStrictEqual(["Quark"])
  })
  test(`overlapping words`, () => {
    expect(solver.findAllSolutions([["d", "o", "g", "s"]], ["dog", "dogs"]).sort()).toStrictEqual(["dog", "dogs"])
  })
})

describe('weird shapes', () => {
  test(`swirl`, () => {
    expect(solver.findAllSolutions(
      [["a", "b", "c", "d"],
       ["j", "k", "l", "e"],
       ["i", "h", "g", "f"]], ["abcdefghijkl"])).toStrictEqual(["abcdefghijkl"])
  })
  test(`loose swirl`, () => {
    expect(solver.findAllSolutions(
      [["a", "b", "c", "d"],
       [".", ".", ".", "e"],
       ["m", "n", ".", "f"],
       ["l", ".", ".", "g"],
       ["k", "j", "i", "h"]], ["abcdefghijklmn"])).toStrictEqual(["abcdefghijklmn"])
  })
  test(`diagonals`, () => {
    expect(solver.findAllSolutions(
      [[".", ".", "e", "."],
       ["b", "d", ".", "f"],
       ["c", "a", ".", "."]], ["abcdef"])).toStrictEqual(["abcdef"])
  })
  test(`not touching edges`, () => {
    expect(solver.findAllSolutions(
      [[".", ".", ".", "."],
       [".", "a", "d", "."],
       [".", "c", "b", "."],
       [".", ".", ".", "."]], ["abcd"])).toStrictEqual(["abcd"])
  })
})

