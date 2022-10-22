
/**
 * Indica um termo unitário de uma expressão.
 */
export type ExpressionTerm = {
    term: string;
    coefficient: number;
}

export type Separator = '=' | '<=' | '>=';

export type Expression = {
    leftSideTerms: ExpressionTerm[];
    rightSideTerms: ExpressionTerm[];
    separator: Separator;
}

