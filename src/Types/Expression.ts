
/**
 * Indica um termo unitário de uma expressão.
 */
export type ExpressionTerm = {
    //Indica a incognita da expressão e.g. x1, x2, x3, etc.
    term: string | null;

    //Indica o coeficiente que multiplica a incognita da expressão e.g. -1, -2, 3, 4, etc.
    coefficient: number;
}

export type Separator = '=' | '<=' | '>=';



export type Expression = {
    //Indica os termos da esquerda da expressão
    leftSideTerms: ExpressionTerm[];

    //Indica os termos da direita da expressão
    rightSideTerms: ExpressionTerm[];

    //Indica o separador da expressão (igualdade, menor ou igual, ou maior ou igual)
    separator: Separator;
}

