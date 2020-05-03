import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from 'src/app/redux_store/store';
import { STATE } from '../actions';
import { Chart } from 'Chart.js';
import 'chartjs-plugin-labels';

@Component({
  selector: 'app-category-split',
  templateUrl: './category-split.component.html',
  styleUrls: ['./category-split.component.css']
})
export class CategorySplitComponent implements OnInit {
  @select() expenses;
  @select() categories;

  public categoryNames = [];
  public categoryWiseExpenses;
  public expensesChart = [];

  constructor(private ngRedux: NgRedux<IAppState>) { }

  ngOnInit() {
    this.ngRedux.dispatch({type: STATE});

    // To extract category names in a seperate array to use as labels in pie Chart.
    this.categories.subscribe(cat => this.categoryNames = cat);

    this.calculateCategoryWiseExpenses();

    if (this.categoryNames.length <= 5)
      this.createChart();
  }

  // Function to calculate sum of expenses category wise to use as dataset for pie chart
  calculateCategoryWiseExpenses() {
    this.categoryWiseExpenses = new Array(this.categoryNames.length);
    this.categoryWiseExpenses.fill(0);

    this.expenses.subscribe(expenses => {
      expenses.forEach(exp => {
        if (exp.isDeleted !== true) {
          let index = this.categoryNames.findIndex(category => category === exp.category);
          this.categoryWiseExpenses[index] += parseInt(exp.amount);
        }
      })
    });
  }

  // Function to create a pie chart
  createChart() {
    this.expensesChart = new Chart("category-wise-expenses", {  
      // The type of chart we want to create
      type: 'pie',
  
      // The data for our dataset
      data: {
        labels: this.categoryNames,
        datasets: [{
            label: 'Category Wise Expenses',
            backgroundColor: ["#4FC2D7", "#48C7B2", "#72C588", "#AOBE68", "E6A667"],
            data: this.categoryWiseExpenses
        }]
      },
  
      // Configuration options go here
      options: { 
        legend: {
          position: "left"
        },

        title: {
          display: true,
          text: 'Category Wise Split',
          fontSize: 20,
          fontStyle: "bold"
        },

        plugins:{
          labels: {
            render: "value",
            fontColor: "white"
          }
        }
      }
    });
  }

}
