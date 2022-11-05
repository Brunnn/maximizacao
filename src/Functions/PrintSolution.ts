import { Solution } from "../Types/SolutionTable";
import { ParsedMaximizationProblem } from "../Util/ParsedMaximizationProblem";
import { PrintExpression } from "../Util/PrintExpression";

export function printSolution(
	this: ParsedMaximizationProblem,
	solution: Solution
) {
	try {
		PrintExpression(this.objective);

		var solutionString = "z = ";
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
		console.log("Solução:", result.toFixed(2));
	} catch (e) {
		// console.log(e);
	}
}
