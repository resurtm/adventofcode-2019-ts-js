import { IntCode } from './intCode';

test('test 5678, 1', () => {
    const code = [3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8];

    const intCode1 = new IntCode(code, [7]);
    intCode1.run();
    expect(intCode1.output).toEqual([0]);

    const intCode2 = new IntCode(code, [8]);
    intCode2.run();
    expect(intCode2.output).toEqual([1]);

    const intCode3 = new IntCode(code, [9]);
    intCode3.run();
    expect(intCode3.output).toEqual([0]);
});

test('test 5678, 2', () => {
    const code = [3, 9, 7, 9, 10, 9, 4, 9, 99, -1, 8];

    const intCode1 = new IntCode(code, [7]);
    intCode1.run();
    expect(intCode1.output).toEqual([1]);

    const intCode2 = new IntCode(code, [8]);
    intCode2.run();
    expect(intCode2.output).toEqual([0]);

    const intCode3 = new IntCode(code, [9]);
    intCode3.run();
    expect(intCode3.output).toEqual([0]);
});

test('test 5678, 3', () => {
    const code = [3, 3, 1108, -1, 8, 3, 4, 3, 99];

    const intCode1 = new IntCode(code, [7]);
    intCode1.run();
    expect(intCode1.output).toEqual([0]);

    const intCode2 = new IntCode(code, [8]);
    intCode2.run();
    expect(intCode2.output).toEqual([1]);

    const intCode3 = new IntCode(code, [9]);
    intCode3.run();
    expect(intCode3.output).toEqual([0]);
});

test('test 5678, 4', () => {
    const code = [3, 3, 1107, -1, 8, 3, 4, 3, 99];

    const intCode1 = new IntCode(code, [7]);
    intCode1.run();
    expect(intCode1.output).toEqual([1]);

    const intCode2 = new IntCode(code, [8]);
    intCode2.run();
    expect(intCode2.output).toEqual([0]);

    const intCode3 = new IntCode(code, [9]);
    intCode3.run();
    expect(intCode3.output).toEqual([0]);
});

test('test 5678, 5', () => {
    const code = [3, 12, 6, 12, 15, 1, 13, 14, 13, 4, 13, 99, -1, 0, 1, 9];

    const intCode1 = new IntCode(code, [-1]);
    intCode1.run();
    expect(intCode1.output).toEqual([1]);

    const intCode2 = new IntCode(code, [0]);
    intCode2.run();
    expect(intCode2.output).toEqual([0]);

    const intCode3 = new IntCode(code, [1]);
    intCode3.run();
    expect(intCode3.output).toEqual([1]);
});

test('test 5678, 6', () => {
    const code = [3, 3, 1105, -1, 9, 1101, 0, 0, 12, 4, 12, 99, 1];

    const intCode1 = new IntCode(code, [-1]);
    intCode1.run();
    expect(intCode1.output).toEqual([1]);

    const intCode2 = new IntCode(code, [0]);
    intCode2.run();
    expect(intCode2.output).toEqual([0]);

    const intCode3 = new IntCode(code, [1]);
    intCode3.run();
    expect(intCode3.output).toEqual([1]);
});

test('test 5678, 7', () => {
    const code = [3, 21, 1008, 21, 8, 20, 1005, 20, 22, 107, 8, 21, 20, 1006, 20, 31,
        1106, 0, 36, 98, 0, 0, 1002, 21, 125, 20, 4, 20, 1105, 1, 46, 104,
        999, 1105, 1, 46, 1101, 1000, 1, 20, 4, 20, 1105, 1, 46, 98, 99];

    const intCode1 = new IntCode(code, [6]);
    intCode1.run();
    expect(intCode1.output).toEqual([999]);

    const intCode2 = new IntCode(code, [7]);
    intCode2.run();
    expect(intCode2.output).toEqual([999]);

    const intCode3 = new IntCode(code, [8]);
    intCode3.run();
    expect(intCode3.output).toEqual([1000]);

    const intCode4 = new IntCode(code, [9]);
    intCode4.run();
    expect(intCode4.output).toEqual([1001]);

    const intCode5 = new IntCode(code, [9]);
    intCode5.run();
    expect(intCode5.output).toEqual([1001]);
});
