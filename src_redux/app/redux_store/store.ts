import { IExpense } from '../iexpense';
import { ADD_EXPENSE, DELETE_EXPENSE, EDIT_EXPENSE, UPDATE_BUDGET, ADD_CATEGORIES, STATE, DELETE_CATEGORY } from '../expense/actions';

export interface IAppState {
    expenses: IExpense[];
    totalBudget: number;
    totalExpenses: number;
    categories: string[];
}

export const INITIAL_STATE: IAppState = {
    expenses: localStorage.getItem("expenses") !== null ? JSON.parse(localStorage.getItem("expenses")) : [],
    totalBudget: localStorage.getItem("totalBudget") !== null ? parseInt(localStorage.getItem("totalBudget")) : 0,
    totalExpenses: localStorage.getItem("totalExpenses") !== null ? parseInt(localStorage.getItem("totalExpenses")) : 0,
    categories: localStorage.getItem("categories") !== null ? JSON.parse(localStorage.getItem("categories")) : []
}

export function rootReducer(state: IAppState, action) : IAppState {
    state = {
        expenses: localStorage.getItem("expenses") !== null ? JSON.parse(localStorage.getItem("expenses")) : [],
        totalBudget: localStorage.getItem("totalBudget") !== null ? parseInt(localStorage.getItem("totalBudget")) : 0,
        totalExpenses: localStorage.getItem("totalExpenses") !== null ? parseInt(localStorage.getItem("totalExpenses")) : 0,
        categories: localStorage.getItem("categories") !== null ? JSON.parse(localStorage.getItem("categories")) : []
    };
    switch(action.type) {
        case ADD_EXPENSE:
            action.expense.id = state.expenses.length + 1;    
            return Object.assign({}, state, {
                expenses: state.expenses.concat(Object.assign({}, action.expense)),
                totalBudget: state.totalBudget,
                totalExpenses: state.totalExpenses + parseInt(action.expense.amount),
                categories: state.categories
            });
        case DELETE_EXPENSE:
            let idx = state.expenses.findIndex(ex => ex.id === parseInt(action.eid));
            let amount = state.expenses[idx].amount;

            state.expenses[idx].isDeleted = true;

            return Object.assign({}, state, {
                expenses: state.expenses,
                totalBudget: state.totalBudget,
                totalExpenses: state.totalExpenses - amount,
                categories: state.categories
            });
        case EDIT_EXPENSE:
            let index = state.expenses.findIndex(ex => ex.id === parseInt(action.expense.id));
            let amt = state.expenses[index].amount;

            state.expenses[index] = action.expense;

            return Object.assign({}, state, {
                expenses: state.expenses,
                totalBudget: state.totalBudget,
                totalExpenses: state.totalExpenses + (parseInt(action.expense.amount) - amt),
                categories: state.categories
            });
        case UPDATE_BUDGET:
            return Object.assign({}, state, {
                expenses: state.expenses,
                totalBudget: state.totalBudget + action.budget,
                totalExpenses: state.totalExpenses,
                categories: state.categories
            });
        case ADD_CATEGORIES:
            return Object.assign({}, state, {
                expenses: state.expenses,
                totalBudget: state.totalBudget,
                totalExpenses: state.totalExpenses,
                categories: state.categories.concat(action.category)
            });
        case STATE:
            return Object.assign({}, state, {
                expenses: state.expenses,
                totalBudget: state.totalBudget,
                totalExpenses: state.totalExpenses,
                categories: state.categories
            });
        case DELETE_CATEGORY:
            return Object.assign({}, state, {
                expenses: state.expenses,
                totalBudget: state.totalBudget,
                totalExpenses: state.totalExpenses,
                categories: state.categories.filter((cat) => cat !== action.catName)
            });
    }
}