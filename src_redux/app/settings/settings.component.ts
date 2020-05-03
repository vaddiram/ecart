import { Component, OnInit } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';
import { ADD_CATEGORIES, UPDATE_BUDGET, DELETE_CATEGORY } from '../expense/actions';
import { IAppState } from '../redux_store/store';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  public budget;
  public category: string;
  @select() totalBudget;
  @select() categories;

  constructor(private ngRedux: NgRedux<IAppState>) { }

  ngOnInit() {
    
  }

  updateBudget() {
    this.ngRedux.dispatch({
      type: UPDATE_BUDGET, 
      budget: parseInt(this.budget)
    });

    this.budget = "";
    
    this.totalBudget.subscribe((b) => {
      localStorage.setItem("totalBudget", (b + ""));
    });
  }

  updateCategories() {
    this.ngRedux.dispatch({
      type: ADD_CATEGORIES, 
      category: this.category
    });

    this.category = "";

    this.categories.subscribe((c) => {
      localStorage.setItem("categories", JSON.stringify(c));
    });
  }

  deleteCategory(categoryName) {
    if (confirm("Are you sure to delete this record ?") == true) {
      this.ngRedux.dispatch({type: DELETE_CATEGORY, catName: categoryName});
    }

    this.categories.subscribe(cat => localStorage.setItem("categories", JSON.stringify(cat)));
  }

}
