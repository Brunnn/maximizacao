import { MaximizationProblem } from "./Types/MaximizationProblem";
import { ParsedMaximizationProblem } from "./Util/ParsedMaximizationProblem";
import { PrintExpression } from "./Util/PrintExpression";

var problem: MaximizationProblem = {
	objective: "z = 2x1 + 3x2",
	restrictions: [
		"1x1 + 3x2 <= 9",
		"-1x1 + 2x2 <= 4",
		"1x1 + 1x2 <= 6"
	],
};

var maximizationProblem = ParsedMaximizationProblem.create(problem);
console.log(maximizationProblem.restrictionsNormalized);


// Printa Função objetivo
console.log("=================== Função Objetivo ===================");

PrintExpression(maximizationProblem.objective);

//Printa Restrições
console.log("=================== Restrições ===================");
maximizationProblem.restrictions.forEach((restriction) => {
	PrintExpression(restriction);
});

/** =============================================== Funções a Serem Implementadas ===============================================
 * Aqui abaixo estão as funções que devem ser
 * implementadas para resolver o problema.
 * Cada função deve ser implementada no arquivo com seu nome. dentro da pasta Functions.
 */

//Implementada
maximizationProblem.normalizeRestrictions();

//Implementada
maximizationProblem.normalizeObjective();

var solution = maximizationProblem.solve();

console.log("=================== Solução ===================");

solution.tables.forEach((element, tableIndex) => {
	const tablePrintableData: { [key in string]: string }[] = [];
	console.log(
		`=================== Tabela ${tableIndex + 1} ===================`
	);

	element.rows.forEach((rowData, index) => {
		var printaBleRowData: { [key in string]: string } = {};
		rowData.forEach((columnData, columnIndex) => {
			printaBleRowData[element.headers[columnIndex]] =
				columnData.toString();
		});
		tablePrintableData.push(printaBleRowData);
	});
	console.table(tablePrintableData);
	console.log("Linha do Pivot: " + element.pivotRow);
	console.log("Coluna do Pivot: " + element.pivotColumn);
});

console.log("=================== Solução ótima encontrada ===================");
solution.solution.forEach((solution) => {
	console.log(solution.term + " = " + solution.value);
});
