import { Solution } from "../Types/SolutionTable";
import { ParsedSimplexProblem } from "../Util/ParsedSimplexProblem";
import { PrintExpression } from "../Util/PrintExpression";

export function printSolution(
	this: ParsedSimplexProblem,
	solution: Solution
) {
	try {
		PrintExpression(this.objective);

		var solutionString = this.objectiveNormalized?.leftSideTerms.find(term => term.term == "z")?.coefficient == -1 ? "-z = " : "z = ";
		var result: number = 0;
		this.objective?.rightSideTerms.forEach((term, index) => {
			let termValue = solution.find(
				(solutionTerm) => solutionTerm.term === term.term
			);

			if (index > 0) solutionString += " + ";

			solutionString += term.coefficient + "*";
			if (termValue) {
				solutionString += termValue.value;
			} else {
				solutionString += "0";
			}
			result += (termValue?.value ?? 0) * term.coefficient;
		});

		console.log(solutionString);
		console.log("Solução:", Math.abs(+result.toFixed(2)));
	} catch (e) {
		// console.log(e);
	}
}
