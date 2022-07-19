import * as energyCalc from './Calculator';

type TestExpectation = { formula: string, expectedResult: number | string; } | null
let expectations: TestExpectation[] = [];

expectations.push({ formula: '#ma', expectedResult: 'ma', substitution:  });
expectations.push({ formula: 'ma+2', expectedResult: 'ma+2' });

const runnerResultsPrefix = 'HALF ASSED RUNNER RESULTS:';

function runnerLog(msg) {
  console.log(`${runnerResultsPrefix} ${msg}`);
  return true;
}
function halfAssedRunner (expectations) {
  let passed = 0;
  let failed = 0;

  try {
    expectations.forEach(expectation => {
      let fail = false;
      let calculationResult = energyCalc.Calculator.calculate(expectation.formula);
      if (!calculationResult.isValid) {
        fail = runnerLog(`expectation result is not valid: ${calculationResult.result}`);
      }
      if (calculationResult.errorPosition !== null) {
        fail = runnerLog(`expectation errorPosition is not null: ${calculationResult.errorPosition}`);
      }
      if (calculationResult.errorMessage !== null) {
        fail = runnerLog(`expectation errorMessage is not null: ${calculationResult.errorMessage}`);
      }
      if (calculationResult.result !== expectation.expectedResult) {
        fail = runnerLog(`expectation is not the result: ${calculationResult.result} !== ${expectation.expectedResult}`);
      }
      if (fail) {
        failed++;
      } else {
        passed++;
      }

    });
  } catch (e) {
    runnerLog(`exception: ${e}.. not to self.. if your test runner blows up you suck`);
    failed++;
  }
  finally {
    runnerLog(`${failed} FAILED and ${passed} PASSED out of ${expectations.length} total`);
  }
}

halfAssedRunner(expectations);
