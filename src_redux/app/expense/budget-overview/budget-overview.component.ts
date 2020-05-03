import { Component, OnInit } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';
import { IAppState } from 'src/app/redux_store/store';
import { STATE } from '../actions';
import { Chart } from 'Chart.js';
import 'chartjs-plugin-labels';

@Component({
  selector: 'app-budget-overview',
  templateUrl: './budget-overview.component.html',
  styleUrls: ['./budget-overview.component.css']
})
export class BudgetOverviewComponent implements OnInit {
  @select() totalBudget;
  @select() totalExpenses;

  public budget: number;
  public tExpenses: number;
  public budgetOverviewChart = []

  constructor(private ngRedux: NgRedux<IAppState>) { }

  ngOnInit() {
    this.ngRedux.dispatch({type: STATE});

    this.totalBudget.subscribe(b => this.budget = b);

    this.totalExpenses.subscribe(e => this.tExpenses = e);

    this.createChart();
  }

  // Function to create a pie chart
  createChart() {
    this.budgetOverviewChart = new Chart("budget-overview", {  
      // The type of chart we want to create
      type: 'pie',
  
      // The data for our dataset
      data: {
        labels: ["Budget", "Expenses"],
        datasets: [{
            label: 'Budget Overview',
            backgroundColor: ["#4FC2D7", "#48C7B2", "#72C588", "#AOBE68", "E6A667"],
            data: [(this.budget - this.tExpenses), this.tExpenses]
        }]
      },
  
      // Configuration options go here
      options: { 
        legend: {
          position: "left"
        },

        title: {
          display: true,
          text: 'Budget Overview',
          fontSize: 20,
          fontStyle: "bold"
        },

        plugins:{
          labels: {
            fontColor: "white"
          }
        }
      }
    });
  }

}
