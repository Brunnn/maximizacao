import { Expression } from "../Types/Expression";
import { ParsedSimplexProblem } from "../Util/ParsedSimplexProblem";

/**
 * Essa função deve popular o campo restrictionsNormalized do objeto 'this'
 * Adicionando as variáveis de folga necessárias para cada restrição, e transformando as inequações em equações.
 * 
 * 
 * exemplo:
 * 
 *      this.restrictionsNormalized = [
 *          {
 *              leftSideTerms: [ 
 *                  { coefficient: 1, term: "x1" }, 
 *                  { coefficient: 1, term: "x2" }, 
 *                  { coefficient: 1, term: "xf1" } 
 *              ],
 *              rightSideTerms: [ { coefficient: 120, term: null } ],
 *              separator: "="
 *           }
 *       ];
 * 
 * */
export function normalizeRestrictions(this: ParsedSimplexProblem){

    this.restrictionsNormalized = [];

    this.restrictions.forEach((restriction, index) => {
        var normalizedRestriction: Expression = restriction;

        if (restriction.separator == "<=") {
            normalizedRestriction.leftSideTerms.push({ coefficient: 1, term: "xf" + (index + 1) });
        }
        else if (restriction.separator == ">=") {
            normalizedRestriction.leftSideTerms.push({ coefficient: -1, term: "xf" + (index + 1) });
        }
        normalizedRestriction.separator = "=";
        this.restrictionsNormalized.push(normalizedRestriction);
    });

}