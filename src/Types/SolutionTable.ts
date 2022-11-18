export type Table = {
    headers: string[];
    rows: Array<Array<number>>
    pivotRow: number;
    pivotColumn: number;
}

export type Solution = Array<{
    term: string;
    value: number;
}>

export type SimplexSolution = {
    tables: Table[];
    solution: Solution
}