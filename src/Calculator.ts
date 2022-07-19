import { CharStreams, CommonTokenStream } from 'antlr4ts';

import { CalculationResult } from './CalculationResult';
import { CalculatorLexer } from './GeneratedAntlr/CalculatorLexer';
import { CalculatorParser } from './GeneratedAntlr/CalculatorParser';
import { FormulaErrorListener } from './FormulaErrorListener';
import { FormulaVisitor } from './FormulaVisitor';

function isNumber(result: string | number): result is number {
    if(result as number) {
        return true
    }
    return false
}

export class Calculator {

    public static calculate(formula: string, substitutionResolver?: (substitution: string) => number): CalculationResult {
        let result = new CalculationResult();
        if (formula == null || /^\s*$/.test(formula)) {
            result.result = 0;
            result.isValid = true;
            console.log('early exit');
            return result;
        }
        let inputStream = CharStreams.fromString(formula);
        let lexer = new CalculatorLexer(inputStream);
        let commonTokenStream = new CommonTokenStream(lexer);
        let parser = new CalculatorParser(commonTokenStream);
        let errorListener = new FormulaErrorListener();
        parser.removeErrorListeners();
        parser.addErrorListener(errorListener);
        if (!substitutionResolver) {
            substitutionResolver = _ => null;
        }
        console.log('after substitutionResolver', substitutionResolver);
        var visitor = new FormulaVisitor(substitutionResolver, errorListener);
        var parseTree = parser.calculator();
        var visitorResult = visitor.visitCalculator(parseTree);
        console.log('visitorResult', visitorResult);
        if (errorListener.isValid) {
            if (visitorResult as String) {
                result.isValid = true;
                result.result = visitorResult;
            } else if (isNaN(<number>visitorResult)) {
                result.isValid = false;
                result.result = NaN;
            } else {
                result.isValid = true;
                result.result = visitorResult;
            }

            return result;
        }
        result.isValid = false;
        result.errorPosition = errorListener.errorLocation;
        result.errorMessage = errorListener.errorMessage;
        result.result = NaN;
        return result;
    }
}