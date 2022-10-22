import { Expression } from "../Types/Expression";

export type MaximizationProblem = {
    objective: string;
    restrictions: string[];
}

export type ParsedMaximizationProblem = {
    // Função objetivo
    objective?: Expression;

    //Sem variáveis de folga
    restrictions: Expression[];

    //Com variáveis de folga definidas
    restrictionsNormalized: Expression[][];
}

export function useExpressionParser() {

    function parseExpression(expression: string): Expression{
        var exp: Expression = { leftSideTerms: [], rightSideTerms: [], separator: '=' };

        //Replace repeated spaces with a single space
        expression = expression.replace(/\s+/g, ' ');

        

        return exp;
    }
    function parseProblem(problem: MaximizationProblem): ParsedMaximizationProblem{
        var parsedProblem: ParsedMaximizationProblem = { restrictions: [], restrictionsNormalized: [] };

        parsedProblem.objective = parseExpression(problem.objective);

        problem.restrictions.forEach(restriction => {
            parsedProblem.restrictions.push(parseExpression(restriction));            
        });
        return parsedProblem;
    }

    return { parseProblem };
}