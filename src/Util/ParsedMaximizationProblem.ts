import { normalizeObjective } from "../Functions/NormalizeObjective";
import { normalizeRestrictions } from "../Functions/NormalizeRestrictions";
import { parseProblem } from "../Functions/ParseProblem";
import { printSolution } from "../Functions/PrintSolution";
import { solve } from "../Functions/Solve";
import { Expression } from "../Types/Expression";
import { MaximizationProblem } from "../Types/MaximizationProblem";

export class ParsedMaximizationProblem {
    // Função objetivo
    objective?: Expression;

    // Função Objetivo toda à esquerda, igualada a 0
    objectiveNormalized?: Expression;

    //Sem variáveis de folga
    restrictions: Expression[] = [];

    //Com variáveis de folga definidas
    restrictionsNormalized: Expression[] = [];


    private constructor() {}

    public static create(problem: MaximizationProblem): ParsedMaximizationProblem {

        //lowercase everything
        problem.objective = problem.objective.toLowerCase();
        problem.restrictions = problem.restrictions.map((restriction) => restriction.toLowerCase());

        const parsedProblem = new ParsedMaximizationProblem();
        parsedProblem.parseProblem(problem);
        return parsedProblem;
    }


    public parseProblem = parseProblem.bind(this);
    
    public normalizeRestrictions = normalizeRestrictions.bind(this);

    public normalizeObjective = normalizeObjective.bind(this);

    public solve = solve.bind(this);

    public printSolution = printSolution.bind(this);
    
}
