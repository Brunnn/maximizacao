export type Table = {
    headers: string[];
    rows: Array<Array<number>>
    pivotRow: number;
    pivotColumn: number;
}

export type MaximizationSolution = {
    tables: Table[];
    solution: Array<{
        term: string;
        value: number;
    }>
}