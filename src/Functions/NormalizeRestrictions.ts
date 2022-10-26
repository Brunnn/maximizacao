import { ParsedMaximizationProblem } from "../Util/ParsedMaximizationProblem";

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
export function normalizeRestrictions(this: ParsedMaximizationProblem){
    
    //Implemente a função aqui.
    //Utilize o campo this.restrictionsNormalized para armazenar o resultado.
    //Utilize o campo this.restrictions para acessar as restrições do problema.

}