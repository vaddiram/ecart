export interface IExpense {
    id: number;
    category: string;
    itemName: string;
    amount: number;
    expenseDate: number;
    isDeleted: boolean;
}