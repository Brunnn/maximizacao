import { Expression, Separator, ExpressionTerm } from "../Types/Expression";
import { SimplexProblem } from "../Types/SimplexProblem";
import { ParsedSimplexProblem } from "../Util/ParsedSimplexProblem";

//Essa função desserializa uma expressão matemática e.g. "z = 100x1 + 150x2"
function parseExpression(expression: string): Expression {
	var exp: Expression = {
		leftSideTerms: [],
		rightSideTerms: [],
		separator: "=",
	};

	//Replace repeated spaces with a single space
	expression = expression.replace(/\s+/g, " ").trim();

	//remove the right side space after any operator (+,-,/,*)
	expression = expression.replace(/(\+|\-|\/|\*)\s+/g, "$1");

	//splits the expression terms
	var terms = expression.split(" ");

	var leftSide = true;
	terms.forEach((term, index) => {
		if (term == "=" || term == "<=" || term == ">=") {
			exp.separator = term as Separator;
			leftSide = false;
			return;
		}

		//gets the coefficient of the term (everything until it finds a letter)
		var coefficient = term.match(/^[+-]?\d*(\.\d+)?/g);

		var coefficientNumber = coefficient
			? coefficient[0] == "-"
				? -1
				: coefficient[0] == ""
				? 1
				: coefficient[0] == "+"
				? 1
				: Number(coefficient[0])
			: 1;


		//gets the term (everything after the coefficient)
		var termString: string | null = term.replace(/^[+-]?\d*(\.\d+)?/g, "");
		termString = termString == "" ? null : termString;
		var expTerm: ExpressionTerm = {
			coefficient: coefficientNumber,
			term: termString,
		};

		if (leftSide) exp.leftSideTerms.push(expTerm);
		else exp.rightSideTerms.push(expTerm);
	});

	return exp;
}

export function parseProblem(
	this: ParsedSimplexProblem,
	problem: SimplexProblem
): void {
	this.objective = parseExpression(problem.objective);

	problem.restrictions.forEach((restriction) => {
		this.restrictions.push(parseExpression(restriction));
	});
}
