import { calcAsteroids } from './asteroids';

test('case 1', () => {
    const field =
        '.#..#\n' +
        '.....\n' +
        '#####\n' +
        '....#\n' +
        '...##\n';
    const coords = calcAsteroids(field);
    expect(coords).toEqual(8);
});

test('case 2', () => {
    const field =
        '......#.#.\n' +
        '#..#.#....\n' +
        '..#######.\n' +
        '.#.#.###..\n' +
        '.#..#.....\n' +
        '..#....#.#\n' +
        '#..#....#.\n' +
        '.##.#..###\n' +
        '##...#..#.\n' +
        '.#....####\n';
    const coords = calcAsteroids(field);
    expect(coords).toEqual(33);
});

test('case 3', () => {
    const field =
        '#.#...#.#.\n' +
        '.###....#.\n' +
        '.#....#...\n' +
        '##.#.#.#.#\n' +
        '....#.#.#.\n' +
        '.##..###.#\n' +
        '..#...##..\n' +
        '..##....##\n' +
        '......#...\n' +
        '.####.###.';
    const coords = calcAsteroids(field);
    expect(coords).toEqual(35);
});

test('case 4', () => {
    const field =
        '.#..#..###\n' +
        '####.###.#\n' +
        '....###.#.\n' +
        '..###.##.#\n' +
        '##.##.#.#.\n' +
        '....###..#\n' +
        '..#.#..#.#\n' +
        '#..#.#.###\n' +
        '.##...##.#\n' +
        '.....#.#..';
    const coords = calcAsteroids(field);
    expect(coords).toEqual(41);
});

test('case 5', () => {
    const field =
        '.#..##.###...#######\n' +
        '##.############..##.\n' +
        '.#.######.########.#\n' +
        '.###.#######.####.#.\n' +
        '#####.##.#.##.###.##\n' +
        '..#####..#.#########\n' +
        '####################\n' +
        '#.####....###.#.#.##\n' +
        '##.#################\n' +
        '#####.##.###..####..\n' +
        '..######..##.#######\n' +
        '####.##.####...##..#\n' +
        '.#####..#.######.###\n' +
        '##...#.##########...\n' +
        '#.##########.#######\n' +
        '.####.#.###.###.#.##\n' +
        '....##.##.###..#####\n' +
        '.#.#.###########.###\n' +
        '#.#.#.#####.####.###\n' +
        '###.##.####.##.#..##';
    const coords = calcAsteroids(field);
    expect(coords).toEqual(210);
});
