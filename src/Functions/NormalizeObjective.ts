import { ParsedSimplexProblem } from "../Util/ParsedSimplexProblem";

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
export function normalizeObjective(this: ParsedSimplexProblem) {
    this.objectiveNormalized = {
        leftSideTerms: [],
        rightSideTerms: [{ coefficient: 0, term: null }],
        separator: "="
    };

    
    if (this.type == "max"){
        this.objective?.rightSideTerms.forEach(term => {
            this.objectiveNormalized?.leftSideTerms.push({ coefficient: -term.coefficient, term: term.term });
        })
        this.objective?.leftSideTerms.forEach(term => {
            this.objectiveNormalized?.leftSideTerms.unshift({ coefficient: term.coefficient, term: term.term });
        });
    }
    //Minimization problem
    else if (this.type == "min"){
        //here we invert the signs of the terms
        this.objective?.rightSideTerms.forEach(term => {
            term.coefficient = -term.coefficient;
        })
        this.objective?.leftSideTerms.forEach(term => {
            term.coefficient = -term.coefficient;
        });

        //Now we need to push all right side terms to the left side
        this.objective?.rightSideTerms.forEach(term => {
            this.objectiveNormalized?.leftSideTerms.push({ coefficient: -term.coefficient, term: term.term });
        })
        this.objective?.leftSideTerms.forEach(term => {
            this.objectiveNormalized?.leftSideTerms.unshift({ coefficient: term.coefficient, term: term.term });
        });

    }
}
