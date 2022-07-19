import { Calculator } from './Calculator';

describe('Energy Score Calculator',
    () => {

        describe('with expression:',
            () => {
                var expectations: { formula: string, expectedResult: number | string; } | null;

                beforeEach(() => {
                    expectations = null;
                });

                afterEach(() => {
                    // Common code used in all tests
                    expect(expectations).not.toBeNull();
                    if (expectations !== null) {
                        var calculationResult = Calculator.calculate(expectations.formula);
                        expect(calculationResult.isValid).toBeTruthy();
                        expect(calculationResult.errorPosition).toBeNull();
                        expect(calculationResult.errorMessage).toBeNull();
                        expect(calculationResult.result).toBe(expectations.expectedResult);
                    }
                });

                it('ma',
                    () => {
                        expectations = { formula: 'ma', expectedResult: 'ma' }
                    });

                it('ma + 2',
                    () => {
                        expectations = { formula: 'ma + 2', expectedResult: 'ma+2' }
                    });

                it('2 + ma',
                  () => {
                    expectations = { formula: 'ma + 2', expectedResult: '2+ma' }
                  });
            });


    });