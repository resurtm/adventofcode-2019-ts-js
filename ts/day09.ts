import { readFile as readFileOriginal } from 'fs';
import { promisify } from 'util';
import { join } from 'path';
import { clone, map } from 'ramda';

enum OpType {
    Nothing = -1,
    Add = 1,
    Mult = 2,
    Input = 3,
    Output = 4,
    Halt = 99,
}

enum ModeType {
    Position = 0,
    Immediate = 1,
}

interface Opcode {
    op: OpType;
    modes: ModeType[];
}

class Code {
    private code: number[];
    private opcode: Opcode;
    private pos: number;

    constructor (code: number[]) {
        this.code = clone(code);
        this.opcode = { op: OpType.Nothing, modes: [] };
        this.pos = 0;
    }

    parseOpcode (): void {
        const str = this.code[this.pos].toString().padStart(5, '0');
        this.opcode = {
            op: parseInt(str.slice(3, 4) === '0' ? str.slice(4, 5) : str.slice(3, 5), 10),
            modes: [parseInt(str[2], 10), parseInt(str[1], 10), parseInt(str[0], 10)]
        };
    }

    getVal (pos: number): number {
        switch (this.opcode.modes[pos]) {
        case ModeType.Position:
            return this.code[this.code[this.pos + pos + 1]];
        case ModeType.Immediate:
            return this.code[this.pos + pos + 1];
        }
        throw new Error('Invalid parameter mode');
    }

    setVal (pos: number, val: number): void {
        switch (this.opcode.modes[pos]) {
        case ModeType.Position:
            this.code[this.code[this.pos + pos + 1]] = val;
            break;
        case ModeType.Immediate:
            this.code[this.pos + pos + 1] = val;
            break;
        }
    }

    run (): void {
        while (this.opcode.op !== OpType.Halt) {
            this.parseOpcode();

            switch (this.opcode.op) {
            case OpType.Add:
                this.setVal(2, this.getVal(0) + this.getVal(1));
                this.pos += 4;
                break;

            case OpType.Mult:
                this.setVal(2, this.getVal(0) * this.getVal(1));
                this.pos += 4;
                break;

            case OpType.Input:
                this.setVal(0, 1);
                this.pos += 2;
                break;

            case OpType.Output:
                console.log(this.getVal(0));
                this.pos += 2;
                break;
            }
        }
    }
}

async function run (): Promise<void> {
    const readFile = promisify(readFileOriginal);
    const rawData = await readFile(join(__dirname, '..', 'input', 'day05_3.txt'));

    const codeData = map(
        str => parseInt(str, 10),
        rawData.toString().trim().split(',')
    );

    const code = new Code(codeData);
    code.run();
}

export default run;
