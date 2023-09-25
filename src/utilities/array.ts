/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Shuffles a 2d array using the Fisher-Yates algorithm
 * @param {T[][]} arr array to be shuffled
 * @returns {T[][]} the same array as was passed in but shuffled
 */
export const shuffle2DArray = <T>(arr: T[][]): T[][] => {
	const copy = [...arr];

	for (let i = copy.length - 1; i > 0; i--) {
		for (let j = copy[i].length - 1; j > 0; j--) {
			const randI = Math.floor(Math.random() * (i + 1));
			const randJ = Math.floor(Math.random() * (j + 1));

			// Swap the elements at (i, j) and (randI, randJ)
			const temp = copy[i][j];
			copy[i][j] = copy[randI][randJ];
			copy[randI][randJ] = temp;
		}
	}
	return copy;
};
