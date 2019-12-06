import { readFile as readFileOriginal } from 'fs';
import { join } from 'path';
import { promisify } from 'util';
import { add, filter, map, reduce } from 'ramda';

const readFile = promisify(readFileOriginal);

const calculateFuel = (weight: number): number => Math.floor(weight / 3) - 2;

function calculateWithFuelWeight (inputWeight: number): number {
    let result = 0;
    let weight = inputWeight;
    while (weight > 0) {
        weight = calculateFuel(weight);
        result += weight;
    }
    return result;
}

async function run (): Promise<void> {
    const data: string = (await readFile(join(__dirname, '..', 'input', 'day01.txt'))).toString();
    const weights: number[] = filter(
        x => !Number.isNaN(x),
        map(
            str => parseInt(str, 10),
            data.split('\n')
        )
    );

    const totalFuel1: number = reduce<number, number>(
        add,
        0,
        map(weight => calculateFuel(weight), weights)
    );
    console.log(`day 01: ${totalFuel1}`);

    const totalFuel2: number = reduce<number, number>(
        add,
        0,
        map(weight => calculateWithFuelWeight(weight), weights)
    );
    console.log(`day 02: ${totalFuel2}`);
}

export default run;
