import { SimplexProblem } from "./Types/SimplexProblem";
import { ParsedSimplexProblem } from "./Util/ParsedSimplexProblem";
import { PrintExpression } from "./Util/PrintExpression";

//Ok
//xf1 = 7.32
//x3 = 66.67
//x1 = 12,5
//xf3 = 7,5
//xf2 = 0
//x2 = 0
//z = 2125,10
var problem: SimplexProblem = {
	objective: "Z = 10x1 + 20x2 + 30x3",
	restrictions: [
		"x1 + 2x2 + 4x3 <= 300",
		"0x1 + 4x2 + 3x3 <= 200",
		"1x1 + 0x2 + 0x3 <= 20",
		"4x1 + 3x2 + 0x3 <= 50"
	],
	type: "max"
};

//Ok
// var problem: MaximizationProblem = {
// 	objective: "Z = 100x1 + 150x2",
// 	restrictions: [
// 		"2x1 + 3x2 <= 120",
// 		"x1 <= 40",
// 		"x2 <= 30"
// 	],
// };

//Ok
// var problem: MaximizationProblem = {
// 	objective: "Z = 180x1 + 320x2",
// 	restrictions: [
// 		"5x1 + 20x2 <= 400",
// 		"10x1 + 15x2 <= 450"
// 	],
// };

// var problem: SimplexProblem = {
// 	objective: "Z = x1 + 2x2 + 3x3",
// 	restrictions: [
// 		"x1 + x2 + x3 <= 10",
// 		"2x1 + x2 + 4x3 <= 12",
// 		"x1 + 3x2 - x3 <= 9",
// 	],
// 	type: "max"
// };

/**
 * Z = 16,11
 */

// var problem: MaximizationProblem = {
// 	objective: "Z = 10x1 + 15x2",
// 	restrictions: [
// 		"2x1 + 1x2 <= 3",
// 		"1x1 + 5x2 <= 2",

// 	],
// };

// var problem: SimplexProblem = {
// 	objective: "Z = 3x1 + 2x2",
// 	restrictions: ["2x1 + x2 >= 10", "x1 + 5x2 >= 15"],
// 	type: "min",
// };

var simplexProblem = ParsedSimplexProblem.create(problem);

// Printa Função objetivo
console.log("=================== Função Objetivo ===================");
PrintExpression(simplexProblem.objective);

//Printa Restrições
console.log("=================== Restrições ===================");
simplexProblem.restrictions.forEach((restriction) => {
	PrintExpression(restriction);
});

/** =============================================== Funções a Serem Implementadas ===============================================
 * Aqui abaixo estão as funções que devem ser
 * implementadas para resolver o problema.
 * Cada função deve ser implementada no arquivo com seu nome. dentro da pasta Functions.
 */

var solution = simplexProblem.solve();
console.log(" =================== Restrições Normalizadas ===================");
simplexProblem.restrictionsNormalized.forEach((restriction) => {
	PrintExpression(restriction);
});
if (simplexProblem.type == "min") {
	if (simplexProblem.auxiliarObjective) {
		console.log(
			"=================== Função Objetivo Auxiliar ==================="
		);
		PrintExpression(simplexProblem.auxiliarObjective);
	}
}

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

console.log("=================== Valor da função objetivo ===================");
simplexProblem.printSolution(solution.solution);
