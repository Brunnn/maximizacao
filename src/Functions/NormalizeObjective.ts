import { ParsedMaximizationProblem } from "../Util/ParsedMaximizationProblem";

/**
 * Essa função deve popular o campo objectiveNormalized do objeto 'this'
 * Passando todos os termos da função objetivo para o lado esquerdo da equação.
 * Igualando a função objetivo a 0.
 * Alterando os sinais necessários.
 *
 * Exemplo:
 *
 *     this.objectiveNormalized = {
 *          leftSideTerms: [
 *              { coefficient: 1, term: "x1" },
 *              { coefficient: 1, term: "x2" }
 *          ],
 *          rightSideTerms: [ { coefficient: 0, term: null } ],
 *          separator: "="
 *     };
 *
 */
export function normalizeObjective(this: ParsedMaximizationProblem) {
  //Implemente a função aqui.
  //Utilize o campo this.objective para acessar a função objetivo do problema.
  //Utilize o campo this.objectiveNormalized para armazenar o resultado.
}
