enum OpType {
    Nothing = -1,
    Add = 1,
    Mult = 2,
    Input = 3,
    Output = 4,
    JumpIfTrue = 5,
    JumpIfFalse = 6,
    LessThan = 7,
    Equals = 8,
    Relative = 9,
    Halt = 99
}

const OpSize: { [key: string]: number } = {
    [OpType.Add]: 4,
    [OpType.Mult]: 4,
    [OpType.Input]: 2,
    [OpType.Output]: 2,
    [OpType.LessThan]: 4,
    [OpType.Equals]: 4,
    [OpType.Relative]: 2
};

enum ModeType {
    Position = 0,
    Immediate = 1,
    Relative = 2,
}

interface Opcode {
    op: OpType;
    modes: ModeType[];
}

export class IntCode {
    private code: number[];

    private opcode: Opcode;
    private pos: number;
    private relativeBase: number;

    private inputPos: number;
    private input: number[];

    public output: number[];

    constructor (code: number[], input: number[] = []) {
        this.code = JSON.parse(JSON.stringify(code));

        this.opcode = { op: OpType.Nothing, modes: [] };
        this.pos = 0;
        this.relativeBase = 0;

        this.inputPos = 0;
        this.input = input;

        this.output = [];
    }

    parseOpcode (): void {
        const str = this.code[this.pos].toString().padStart(5, '0');
        this.opcode = {
            op: parseInt(str.slice(3, 4) === '0' ? str.slice(4, 5) : str.slice(3, 5), 10),
            modes: [parseInt(str[2], 10), parseInt(str[1], 10), parseInt(str[0], 10)]
        };
    }

    ensureCodeSize (pos: number): void {
        if (pos >= this.code.length) {
            while (this.code.length <= pos) {
                this.code.push(0);
            }
        }
    }

    getVal (pos: number): number {
        let newPos;
        switch (this.opcode.modes[pos]) {
        case ModeType.Position:
            newPos = this.code[this.pos + pos + 1];
            break;
        case ModeType.Immediate:
            newPos = this.pos + pos + 1;
            break;
        case ModeType.Relative:
            newPos = this.code[this.pos + this.relativeBase + pos + 1];
            break;
        default:
            throw new Error('Invalid parameter mode');
        }
        this.ensureCodeSize(newPos);
        return this.code[newPos];
    }

    setVal (pos: number, val: number): void {
        let newPos;
        switch (this.opcode.modes[pos]) {
        case ModeType.Position:
            newPos = this.code[this.pos + pos + 1];
            break;
        case ModeType.Immediate:
            newPos = this.pos + pos + 1;
            break;
        case ModeType.Relative:
            newPos = this.code[this.pos + this.relativeBase + pos + 1];
            break;
        default:
            throw new Error('Invalid parameter mode');
        }
        this.ensureCodeSize(newPos);
        this.code[newPos] = val;
    }

    run (): void {
        while (this.opcode.op !== OpType.Halt) {
            this.parseOpcode();

            switch (this.opcode.op) {
            case OpType.Add:
                this.setVal(2, this.getVal(0) + this.getVal(1));
                break;

            case OpType.Mult:
                this.setVal(2, this.getVal(0) * this.getVal(1));
                break;

            case OpType.Input:
                if (this.input.length === 0) {
                    throw new Error('Program waits for some input, input is empty');
                }
                this.setVal(0, this.input[this.inputPos]);
                this.inputPos += 1;
                this.inputPos %= this.input.length;
                break;

            case OpType.Output:
                this.output.push(this.getVal(0));
                break;

            case OpType.JumpIfTrue:
                if (this.getVal(0) !== 0) {
                    this.pos = this.getVal(1);
                } else {
                    this.pos += 3;
                }
                break;

            case OpType.JumpIfFalse:
                if (this.getVal(0) === 0) {
                    this.pos = this.getVal(1);
                } else {
                    this.pos += 3;
                }
                break;

            case OpType.LessThan:
                this.setVal(2, this.getVal(0) < this.getVal(1) ? 1 : 0);
                break;

            case OpType.Equals:
                this.setVal(2, this.getVal(0) === this.getVal(1) ? 1 : 0);
                break;

            case OpType.Relative:
                this.relativeBase += this.getVal(0);
                break;
            }

            if (this.opcode.op in OpSize) {
                this.pos += OpSize[this.opcode.op];
            }
        }
    }
}
