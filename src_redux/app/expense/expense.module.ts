import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { EditExpenseComponent } from './edit-expense/edit-expense.component';
import { BudgetOverviewComponent } from './budget-overview/budget-overview.component';
import { CategorySplitComponent } from './category-split/category-split.component';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    DashboardComponent, 
    AddExpenseComponent, 
    EditExpenseComponent, 
    BudgetOverviewComponent, 
    CategorySplitComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    NgxPaginationModule
  ]
})
export class ExpenseModule { 
  
}
