import { Expression } from "../Types/Expression";
import { ParsedSimplexProblem } from "../Util/ParsedSimplexProblem";

export function calculateAuxiliarObjective(this: ParsedSimplexProblem) {
	var auxiliarObjective: Expression = {
		leftSideTerms: [{ coefficient: 1, term: "w" }],
		rightSideTerms: [],
		separator: "=",
	};

	var allAuxiliarExpressions: Expression[] = [];
	var auxiliarExpression: Expression | null = null;
	this.restrictionsNormalized.forEach((restriction, index) => {
		var auxiliarVariable = restriction.leftSideTerms.find((term) =>
			term.term?.startsWith("a")
		);
		if (auxiliarVariable) {
			auxiliarExpression = JSON.parse(JSON.stringify(restriction));
			//We isolate the auxiliar variable
			auxiliarExpression?.leftSideTerms
				.slice(0)
				.forEach((term, index) => {
					if (term.term?.startsWith("a")) return;

					auxiliarExpression?.rightSideTerms.push({
						coefficient: -term.coefficient,
						term: term.term,
					});
					//remove the term from the left side
					auxiliarExpression?.leftSideTerms.splice(
						auxiliarExpression?.leftSideTerms.indexOf(term),
						1
					);
				});

			allAuxiliarExpressions.push(
				JSON.parse(JSON.stringify(auxiliarExpression))
			);
		}
	});

	//Now we sum all the auxiliar expressions to make the auxiliar objective
	allAuxiliarExpressions.forEach((auxiliarExpression, index) => {
		auxiliarExpression.rightSideTerms.forEach((term, index) => {
			var alreadyHasTerm = auxiliarObjective.rightSideTerms.find(
				(termAux) => termAux.term == term.term
			);
			if (alreadyHasTerm) {
				alreadyHasTerm.coefficient += term.coefficient;
			} else {
				auxiliarObjective.rightSideTerms.push(term);
			}
		});
	});
	this.auxiliarObjective = auxiliarObjective;
}
