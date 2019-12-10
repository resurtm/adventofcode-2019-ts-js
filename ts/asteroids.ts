import { map } from 'ramda';

interface Point {
    x: number;
    y: number;
}

export function calcAsteroids (inputData: string): number {
    const rows = map(
        row => row.split(''),
        inputData.replace(/#/g, '0').split('\n')
    );

    for (let j = 0; j < rows.length; j++) {
        for (let i = 0; i < rows[j].length; i++) {
            const ch1 = rows[j][i];

            for (let y = 0; y < rows.length; y++) {
                for (let x = 0; x < rows[y].length; x++) {
                    const ch2 = rows[y][x];

                    if ((x === i && y === j) || ch1 === '.' || ch2 === '.') {
                        continue;
                    }

                    const m = (x + i) / 2;
                    const n = (y + j) / 2;
                    if (Number.isInteger(m) && Number.isInteger(n) && rows[n][m] !== '.') {
                        continue;
                    }

                    let skip = false;
                    if (i === x) {
                        if (j < y) {
                            for (let t = j + 1; t <= y - 1; t++) {
                                if (rows[t][i] !== '.') {
                                    skip = true;
                                    break;
                                }
                            }
                        } else {
                            for (let t = y + 1; t <= j - 1; t++) {
                                if (rows[t][i] !== '.') {
                                    skip = true;
                                    break;
                                }
                            }
                        }
                    } else if (j === y) {
                        if (i < x) {
                            for (let t = i + 1; t <= x - 1; t++) {
                                if (rows[j][t] !== '.') {
                                    skip = true;
                                    break;
                                }
                            }
                        } else {
                            for (let t = x + 1; t <= i - 1; t++) {
                                if (rows[j][t] !== '.') {
                                    skip = true;
                                    break;
                                }
                            }
                        }
                    }
                    if (skip) {
                        continue;
                    }

                    let skip2 = false;
                    if (Math.abs(x - i) === Math.abs(y - j)) {
                        if (x < i && y < j) {
                            for (let mm = x + 1, nn = y + 1; mm <= i - 1; mm++, nn++) {
                                if (rows[nn][mm] !== '.') {
                                    skip2 = true;
                                    break;
                                }
                            }
                        } else if (x > i && y < j) {
                            for (let mm = i + 1, nn = y + 1; mm <= x - 1; mm++, nn++) {
                                if (rows[nn][mm] !== '.') {
                                    skip2 = true;
                                    break;
                                }
                            }
                        } else if (x > i && y > j) {
                            for (let mm = i + 1, nn = j + 1; mm <= x - 1; mm++, nn++) {
                                if (rows[nn][mm] !== '.') {
                                    skip2 = true;
                                    break;
                                }
                            }
                        } else if (x < i && y > j) {
                            for (let mm = x + 1, nn = j + 1; mm <= i - 1; mm++, nn++) {
                                if (rows[nn][mm] !== '.') {
                                    skip2 = true;
                                    break;
                                }
                            }
                        }
                    }
                    if (skip2) {
                        continue;
                    }

                    rows[j][i] = (parseInt(rows[j][i], 10) + 1).toString();
                    rows[y][x] = (parseInt(rows[y][x], 10) + 1).toString();
                }
            }
        }
    }

    let max = 0;
    for (let j = 0; j < rows.length; j++) {
        for (let i = 0; i < rows[j].length; i++) {
            if (rows[j][i] === '.') {
                continue;
            }
            if (max < parseInt(rows[j][i], 10) / 2) {
                max = parseInt(rows[j][i], 10) / 2;
            }
        }
    }
    return max;
}
