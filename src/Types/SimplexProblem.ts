export type SimplexProblem = {
    objective: string;
    restrictions: string[];
    type: SimplexType
}


export type SimplexType = "max" | "min";