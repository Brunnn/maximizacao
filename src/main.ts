import { MaximizationProblem, useExpressionParser } from "./Util/ExpressionParser";

console.log("saadssad");

const { parseProblem } = useExpressionParser()


var problem: MaximizationProblem = {
    objective: "z = 100x1 + 150x2",
    restrictions: [
        "2x1 + 3x2 <= 120",
        "x1 <= 40",
        "x2 <= 30"
    ]
}
var result = parseProblem(problem);

console.log(result);