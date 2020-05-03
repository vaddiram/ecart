import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { IExpense } from 'src/app/iexpense';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from 'src/app/redux_store/store';
import { ADD_CATEGORIES, STATE, EDIT_EXPENSE } from '../actions';

@Component({
  selector: 'app-edit-expense',
  templateUrl: './edit-expense.component.html',
  styleUrls: ['./edit-expense.component.css']
})
export class EditExpenseComponent implements OnInit {
  public errorMsg: string = "";
  public model: IExpense;

  @select() categories;
  @select() expenses;
  @select() totalExpenses;
  @select() totalBudget;

  constructor(
    private route: ActivatedRoute,
    private ngRedux: NgRedux<IAppState>
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.model = {
        id: parseInt(params.get("id")),
        category: params.get("category"),
        itemName: params.get("itemName"),
        amount: parseInt(params.get("amount")),
        expenseDate: parseInt(params.get("expenseDate")),
        isDeleted: params.get("isDeleted") == "true" ? true : false
      };
    });

    this.ngRedux.dispatch({type: STATE});
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

  updateExpense() {
    let budget, actualAmt;

    this.totalBudget.subscribe(b => budget = b);
    
    actualAmt = typeof this.model.amount == "string" ? parseInt(this.model.amount) : this.model.amount;

    if (budget > actualAmt) {
      this.ngRedux.dispatch({
        type: EDIT_EXPENSE, 
        expense: this.model}
      );

      this.resetForm();

      this.expenses.subscribe(e => localStorage.setItem("expenses", JSON.stringify(e)));

      this.totalExpenses.subscribe(amt => localStorage.setItem("totalExpenses", (amt + "")));
    } else {
      this.resetForm();
      this.errorMsg = "You don't have sufficient budget to add this expense. Please update the budget";
    }
  }

}
