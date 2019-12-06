import { readFile as readFileOriginal } from 'fs';
import { promisify } from 'util';
import { add, filter, map, reduce } from 'ramda';

const readFile = promisify(readFileOriginal);
const calculateFuel = (weight: number): number => Math.floor(weight / 3) - 2;

async function run(): Promise<void> {
    const data: string = (await readFile(__dirname + '/../input/day01.txt')).toString();
    const items: number[] = map(
        str => parseInt(str, 10),
        data.split('\n'),
    );
    const fuel: number[] = map(
        weight => calculateFuel(weight),
        filter<number>(x => !Number.isNaN(x), items),
    );
    const totalFuel: number = reduce<number, number>(add, 0, fuel);
    console.log(`day 01: ${totalFuel}`);
}

run();
