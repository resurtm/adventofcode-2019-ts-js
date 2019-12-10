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

    const intCode = new IntCode(codeData, [1]);
    intCode.run();
    console.log(intCode.output);
}

export default run;
