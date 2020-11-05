import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalculatorComponent } from './calculator/calculator.component';
import { HistoryComponent } from './history/history.component';

const routes: Routes = [
  {path:'calculator',component:CalculatorComponent},
  {path:'history',component:HistoryComponent},
  {path:'',component:CalculatorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
