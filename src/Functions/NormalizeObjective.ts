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
    this.objectiveNormalized = {
        leftSideTerms: [],
        rightSideTerms: [{ coefficient: 0, term: null }],
        separator: "="
    };
    this.objective?.rightSideTerms.forEach(term => {
        this.objectiveNormalized?.leftSideTerms.push({ coefficient: -term.coefficient, term: term.term });
    })
    this.objective?.leftSideTerms.forEach(term => {
        this.objectiveNormalized?.leftSideTerms.unshift({ coefficient: term.coefficient, term: term.term });
    });
}
