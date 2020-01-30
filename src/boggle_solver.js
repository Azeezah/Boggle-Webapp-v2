function findAllSolutions(grid, dictionary) {
  if (!grid || !grid.length || !grid[0].length || !dictionary || !dictionary.length) {
    return []
  }
  const height = grid.length
  const width = grid[0].length
  const num_directions = 8  // There're 8 valid directions: top, topright, right, etc.
  let valid_words = new Set()
  for (var word of dictionary) {
    if (word.length >= 3) {
      valid_words.add(word.toUpperCase())
    }
  }
  let answers = new Set()
  let prefixes = new Set()
  for (word of valid_words) {
    for (var len=1; len<=word.length; len++) {
      prefixes.add(word.slice(0,len))
    }
  }
  // For each cell in the grid, do depth-first-search to find valid words.
  for (var x=0; x<width; x++) {
    for (var y=0; y<height; y++) {
      let path = [0]  // List (stack) of directions numbered 0-7.
      let go_back = false
      while (path.length > 0) {
        word = path_to_str(grid, [x,y], path, width, height)
        if (valid_words.has(word)) {
          answers.add(word)
        }
        if (!prefixes.has(word) || go_back) {
          if (path[path.length-1] === num_directions-1) {
            path.pop()
            go_back = true
          }
          else {
            path[path.length-1]++  // Change direction of last step.
            go_back = false
          }
        } else {
          path.push(0)  // Add step going in direction `0`.
        }
      }
    }
  }
  return preserve_input_format(dictionary, answers)
}

// Deltas are changes in coordinates cooresponding to given directions.
const deltas = [[0, 1], [1, 1], [1, 0], [1, -1],
                [0, -1], [-1, -1], [-1, 0], [-1, 1]]

function path_to_str(grid, start, path, width, height){
  // Converts path (a list of numbered directions) to the corresponding string.
  // So 0 is up, 1 is up-right, 2 is right, and so on.  The order is specified in the deltas list.
  // Example: if start=[0, 2], path=[0, 1, 2], and grid is as follows, then output string is "abcd".
  //  [['.', 'c', 'd'],
  //   ['b', '.', '.'],
  //   ['a', '.', '.']]
  let [x, y] = start
  let word = [grid[y][x]]
  let seen = new Set([start.join(';')])
  for (var direction of path) {
    var [dx, dy] = deltas[direction]
    x += dx
    y += dy
    if (seen.has(x+';'+y) ||
        !(0 <= y && y < height && 0 <= x && x < width)) {
      return ""
    }

    // We create pairs (x,y) with a string instead of an array since arrays aren't hashable.
    seen.add(x+';'+y)
    word.push(grid[y][x])
  }
  return word.join('').toUpperCase()
}

function preserve_input_format(input, output) {
  // Maintain order and casing of input dictionary.
  let results = []
  for (var w of input) {
    if (output.has(w.toUpperCase())) {
      results.push(w)
    }
  }
  return results
}

export default findAllSolutions;
