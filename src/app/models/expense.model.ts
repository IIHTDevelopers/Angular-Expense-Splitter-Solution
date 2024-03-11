export class Expense {
    constructor(
        public amount: number,
        public paidBy: string,
        public splitAmong: string[]
    ) { }
}
