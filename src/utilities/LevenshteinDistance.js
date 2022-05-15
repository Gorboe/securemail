/**
 * There are 3 actions that can be done in Levensthein distance algorithm. Each action counts as + 1
 * to the total amount of actions, which is the levensthein distance between the two strings.
 * Replace - You can replace an existing character with another.
 * Delete - You can delete a character from the string.
 * Insert - You can add a character to the string.
 */
export default function getLevenstheinDistance(string1, string2) {
  const matrix = [];

  // Set up base matrix
  for (let i = 0; i < string1.length + 1; i += 1) {
    const row = [];
    for (let j = 0; j < string2.length + 1; j += 1) {
      row.push(j);
    }
    row[0] = i;
    matrix.push(row);
  }

  // Check current against [-1][-1], [-1][0], [0][-1]
  for (let i = 1; i < string1.length + 1; i += 1) {
    for (let j = 1; j < string2.length + 1; j += 1) {
      if (string1[i - 1] === string2[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = 1 + Math.min(matrix[i - 1][j - 1], matrix[i - 1][j], matrix[i][j - 1]);
      }
    }
  }
  // console.log(matrix);
  return matrix[string1.length][string2.length];
}
