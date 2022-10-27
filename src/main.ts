import { MaximizationProblem } from "./Types/MaximizationProblem";
import { ParsedMaximizationProblem } from "./Util/ParsedMaximizationProblem";

var problem: MaximizationProblem = {
  objective: "z = 100x1 + 150x2",
  restrictions: ["2x1 + 3x2 <= 120", "x1 <= 40", "x2 <= 30"],
};

var maximizationProblem = ParsedMaximizationProblem.create(problem);

//Printa Função objetivo
console.log("=================== Função Objetivo ===================");

console.log(maximizationProblem.objective);

//Printa Restrições
console.log("=================== Restrições ===================");
maximizationProblem.restrictions.forEach((restriction) => {
  console.log(restriction);
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
//Exemplo de como imprimir a solução
// solution.tables.push({
//     headers: ["x1", "x2", "z"],
//     rows: [
//         [2,5,6],
//         [3,4,5],
//         [4,3,4],
//     ],
//     pivotColumn: 0,
//     pivotRow: 0,
// });
// solution.solution.push(
//   {
//     term: "x1",
//     value: 2,
//   },
//   {
//     term: "x2",
//     value: 5,
//   }
// );
solution.tables.forEach((element, tableIndex) => {
  const tablePrintableData: { [key in string]: string }[] = [];
  console.log(`=================== Tabela ${tableIndex} ===================`);

  element.rows.forEach((rowData, index) => {
    var printaBleRowData: { [key in string]: string } = {};
    rowData.forEach((columnData, columnIndex) => {
      printaBleRowData[element.headers[columnIndex]] = columnData.toString();
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
