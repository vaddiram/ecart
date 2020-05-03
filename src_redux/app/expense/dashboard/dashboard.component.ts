import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from 'src/app/redux_store/store';
import { STATE, DELETE_EXPENSE } from '../actions';
import { IExpense } from 'src/app/iexpense';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @select() expenses;
  @select() totalExpenses;

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private router: Router
  ) { }

  ngOnInit() {
    this.ngRedux.dispatch({type: STATE});
  }

  editExpense(expense: IExpense) {
    this.router.navigate(["/editexpense", {
      id: expense.id,
      category: expense.category,
      itemName: expense.itemName,
      amount: expense.amount,
      expenseDate: expense.expenseDate
    }]);
  }

  deleteExpense(id) {
    if (confirm("Are you sure to delete this record ?") == true) {
      this.ngRedux.dispatch({type: DELETE_EXPENSE, eid: id});
    }

    this.expenses.subscribe(e => localStorage.setItem("expenses", JSON.stringify(e)));

    this.totalExpenses.subscribe(amt => localStorage.setItem("totalExpenses", (amt + "")));
  }

}
