export class CalculationResult {
    constructor() {
        console.log('working');
    }
    public isValid: boolean = false;
    public errorPosition: number | null = null;
    public errorMessage: string | null = null;
    public result: number | string = NaN;
}