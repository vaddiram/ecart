import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from 'src/app/redux_store/store';
import { IExpense } from 'src/app/iexpense';
import { STATE, ADD_EXPENSE } from '../actions';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css']
})
export class AddExpenseComponent implements OnInit {
  @select() expenses;
  @select() categories;
  @select() totalExpenses;
  @select() totalBudget;
  public errorMsg = "";
  public model: IExpense;

  constructor(
    private ngRedux: NgRedux<IAppState>
  ) { }

  ngOnInit() {
    this.ngRedux.dispatch({type: STATE});
    this.resetForm();
  }

  resetForm() {
    this.model = {
      id: 0,
      category: "Select Category",
      itemName: "",
      amount: 0,
      expenseDate: Date.now(),
      isDeleted: false
    }
  }

  addExpense() {
    let budget, actualAmt;

    this.totalBudget.subscribe(b => budget = b);
    
    actualAmt = typeof this.model.amount == "string" ? parseInt(this.model.amount) : this.model.amount;
    
    if (budget > actualAmt) {
      this.errorMsg = "";
      
      this.ngRedux.dispatch({
        type: ADD_EXPENSE,
        expense: this.model
      });

      this.resetForm();

      this.expenses.subscribe(e => localStorage.setItem("expenses", JSON.stringify(e)));

      this.totalExpenses.subscribe(amount => localStorage.setItem("totalExpenses", (amount + "")));
    } else {
      this.resetForm();
      this.errorMsg = "You don't have sufficient budget to add this expense. Please update the budget";
    }
  }

}
