import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './expense/dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { AddExpenseComponent } from './expense/add-expense/add-expense.component';
import { EditExpenseComponent } from './expense/edit-expense/edit-expense.component';

const routes: Routes = [
  {path: "", component: DashboardComponent},
  {path: "settings", component: SettingsComponent},
  {path: "addexpense", component: AddExpenseComponent},
  {path: "editexpense", component: EditExpenseComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
