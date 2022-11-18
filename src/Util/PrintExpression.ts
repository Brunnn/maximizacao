import { Expression, ExpressionTerm } from "../Types/Expression";

/**
 * Pretty print an expression.
 *
 * @param expression
 */
export function PrintExpression(expression?: Expression) {
	if (!expression) return;
	//The output should also put the operator between the terms.
	//If the term is null it means that it is the independent term.
	//If the coefficient is 1 or -1 it should not be printed.
	//If the coefficient is 0 it should not be printed.
	//If the coefficient is -1 it should be printed as -.
	let output = "";

	function printTerm(term: ExpressionTerm, equationIndex: number) {
		if (term.coefficient === 1)
			output += (equationIndex != 0 ? " + " : "") + term.term;
		else if (term.coefficient === -1) output += " - " + term.term;
		else if (term.coefficient !== 0)
			output +=
				(term.coefficient < 0
					? " - "
					: equationIndex != 0
					? " + "
					: "") +
				Math.abs(term.coefficient) +
				(term.term ?? "");
        else if (term.coefficient === 0 && term.term === null)
            output += "0";
	}

	expression.leftSideTerms.forEach((term, index) => printTerm(term, index));
	output += " " + expression.separator + " ";
	expression.rightSideTerms.forEach((term, index) => printTerm(term, index));
	console.log(output);
}
