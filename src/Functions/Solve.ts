import { MaximizationSolution, Solution, Table } from "../Types/SolutionTable";
import { ParsedMaximizationProblem } from "../Util/ParsedMaximizationProblem";

/**
 * Aqui nessa função deve-se implementar o algoritmo de solução do problema.
 * Armazenando cada tabela gerada nos passos, além dos pivots utilizados.
 * No final deve-se retornar:
 * - um objeto do tipo MaximizationSolution.
 * - os valores ótimos das variáveis de decisão.
 * - as tabela geradas em cada passo.
 * - os pivots utilizados em cada passo.
 *
 * Você pode/deve criar outras funções auxiliares para implementar o algoritmo, mas não pode alterar a assinatura dessa função.
 */

function getIncognitas(problem: ParsedMaximizationProblem): Array<string> {
	var incognitas: Array<string | null> = [];
	incognitas.push(
		...(problem.objective?.leftSideTerms.map((term) => term.term) ?? [])
	);
	incognitas.push(
		...(problem.objective?.rightSideTerms.map((term) => term.term) ?? [])
	);
	problem.restrictionsNormalized.forEach((restriction) => {
		incognitas.push(
			...(restriction.leftSideTerms.map((term) => term.term) ?? [])
		);
		incognitas.push(
			...(restriction.rightSideTerms.map((term) => term.term) ?? [])
		);
	});
	//remove repeated terms
	incognitas = incognitas.filter(
		(term, index) => incognitas.indexOf(term) === index
	);
	//remove null terms
	incognitas = incognitas.filter((term) => term !== null);

	//add independent term
	incognitas.push("b");

	return incognitas as Array<string>;
}

function getPivot(table: Table): {  pivotRow: number, pivotColumn: number } {
    var pivotRow: number = 0;
    var pivotColumn: number = 0;

    //get pivot column
	table.headers.forEach((header, index) => {
		if (header == "b" || header == "z" || header.startsWith("xf")) return;

		if (table.rows[0][index] < table.rows[0][pivotColumn] )
			pivotColumn = index;
	});


    //get pivot row
    var pivotRowValue = Number.MAX_VALUE;
	table.headers.forEach((headers, index) => {
		if (headers == 'b' || headers == "z" || headers.startsWith("xf"))
			return;

		var value = table.rows[index][table.rows[index].length - 1] / table.rows[index][pivotColumn];
		if (value < pivotRowValue && value > 0) {
			pivotRowValue = value;
			pivotRow = index;
		}
		
	});

    return {pivotRow, pivotColumn};
}

function stillHaveNegativeValues(table: Table): boolean {
	var hasNegativeValues = false;
	table.headers.forEach((header, index) => {
		if (header == "b" || header == "z" || header.startsWith("xf")) return;

		if (table.rows[0][index] < 0) {
			hasNegativeValues = true;
			return;
		}

	});
	return hasNegativeValues;
}

function solveTable(initialTable: Table): Table[]{
    var tables: Table[] = [];
	tables.push(JSON.parse(JSON.stringify(initialTable)));
    var auxTable: Table = initialTable;
    //While there is a negative value in the objective function
 
	var count = 0;
    while(stillHaveNegativeValues(auxTable)){
		count++;
        let { pivotColumn, pivotRow } = getPivot(auxTable);
        auxTable.pivotRow = pivotRow;
        auxTable.pivotColumn = pivotColumn;

		//Multiply pivot row by 1/pivot value
		auxTable.rows[auxTable.pivotRow] = auxTable.rows[pivotRow].map((value) => {
			return value / auxTable.rows[pivotRow][pivotColumn];
		});

		//We need to make all other values from the pivot column 0
		//So we multiply the pivot row by the invrsed value of the respective pivot column value from the other rows
		var auxRow: number[] = [];
		var multiplier: number = 0;

		auxTable.rows.forEach((row, index) => {
			auxRow = [];
			if (index == auxTable.pivotRow)
				return;
			if (row[auxTable.pivotColumn] == 0)
				return;
		
			//Inverts the value of the pivot column from the row we need to make 0
			if (row[auxTable.pivotColumn] > 0) {
				multiplier = -1;
			} else {
				multiplier = 1;
			}
			multiplier = multiplier * Math.abs(row[auxTable.pivotColumn]);
			
			
			//We multiply the pivot row by the inverted value of the pivot column from the row we need to make 0
			auxRow = auxTable.rows[auxTable.pivotRow].map((value) => {
				return value * multiplier;
			});

			//We add the result of the multiplication to the row we need to make 0
			auxTable.rows[index] = auxTable.rows[index].map((value, index) => {
				return value + auxRow[index];
			});
		});

		var auxTableCopy: Table = JSON.parse(JSON.stringify(auxTable));
    	tables.push(auxTableCopy);

		// if(count == 4) 
		// 	//@ts-ignore
		// 	break;
    }

    return tables;
}

function getOptimalSolution(solvedTable: Table): Solution{
	var solution: Solution = [];
	solvedTable.headers.forEach((header, index) => {
		//Ignore the independent term column
		if (header == "b" || header.toLowerCase() === "z") return;

		var value = 0;
		solvedTable.rows.forEach((row, rowIndex) => {
			//Ingnore the objective function row
			if (rowIndex == 0) return;

			if (row[index] == 1) {
				value = row[row.length - 1];
			}
		});
		
		solution.push({ term: header, value });

	});


	return solution;
}

export function solve(this: ParsedMaximizationProblem): MaximizationSolution {
	var solution: MaximizationSolution = { solution: [], tables: [] };

	var incognitas = getIncognitas(this);

	//Mounts the first table organized by the incognitas
	var firstTable: Table = {
		headers: incognitas,
		rows: [],
		pivotRow: -1,
		pivotColumn: -1,
	};
	//Mounts the first row of the table using the objective function
	var firstRow: Array<number> = [];
	incognitas.forEach((incognita) => {
		var term = this.objectiveNormalized?.leftSideTerms.find(
			(term) => term.term === incognita
		);
		if (term) {
			firstRow.push(term.coefficient);
		} else {
			firstRow.push(0);
		}
	});
	firstTable.rows.push(firstRow);

	//Mounts the other rows of the table using the normalized restrictions
	this.restrictionsNormalized.forEach((restriction) => {
		var row: Array<number> = [];
		incognitas.forEach((incognita) => {
			//If it is the independent term, we search for the null term
			if (incognita === "b") {
				var term = restriction.rightSideTerms.find(
					(term) => term.term === null
				);
				if (term) row.push(term.coefficient);
				else row.push(0);
			} else {
				var term = restriction.leftSideTerms.find(
					(term) => term.term === incognita
				);
				if (term) row.push(term.coefficient);
				else row.push(0);
			}
		});
		firstTable.rows.push(row);
	});

    var tables = solveTable(firstTable);
	solution.solution = getOptimalSolution(tables[tables.length - 1]);
	solution.tables = tables;
   
	return solution;
}
