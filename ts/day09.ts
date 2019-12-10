import { readFile as readFileOriginal } from 'fs';
import { promisify } from 'util';
import { join } from 'path';
import { map } from 'ramda';
import { IntCode } from './intCode';

async function run (): Promise<void> {
    const readFile = promisify(readFileOriginal);
    const rawData = await readFile(join(__dirname, '..', 'input', 'day09.txt'));

    const codeData = map(
        str => parseInt(str, 10),
        rawData.toString().trim().split(',')
    );

    const intCode1 = new IntCode(codeData, [1]);
    intCode1.run();
    console.log(`day 09, part 1: ${intCode1.output}`);

    const intCode2 = new IntCode(codeData, [2]);
    intCode2.run();
    console.log(`day 09, part 2: ${intCode2.output}`);
}

export default run;
