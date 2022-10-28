import { Expression } from "../Types/Expression";

/**
 * Pretty print an expression.
 * 
 * @param expression 
 */
export function PrintExpression(expression?: Expression){
    if(!expression) return;
    //The output should also put the operator between the terms.
    //If the term is null it means that it is the independent term.
    //If the coefficient is 1 or -1 it should not be printed.
    //If the coefficient is 0 it should not be printed.
    //If the coefficient is -1 it should be printed as -.
    let output = "";
    expression.leftSideTerms.forEach((term, index) => {
        if(term.coefficient === 1) output += (index != 0 ? " + " : "") + term.term;
        else if(term.coefficient === -1) output += " - " + term.term;
        else if(term.coefficient !== 0) output += (term.coefficient < 0 ? " - " : index != 0 ? " + " : "") + Math.abs(term.coefficient) + (term.term ?? "");
    });
    output += " " +expression.separator + " ";
    expression.rightSideTerms.forEach((term, index) => {
        if(term.coefficient === 1) output += (index != 0 ? " + " : "") +  term.term;
        else if(term.coefficient === -1) output += " - " + term.term;
        else if(term.coefficient !== 0) output += (term.coefficient < 0 ? " - " : index != 0 ? " + " : "") + Math.abs(term.coefficient) + (term.term ?? "");
    }
    );
    console.log(output);
}