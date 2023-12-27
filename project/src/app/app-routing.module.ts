import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskComponent } from './task/task.component';
import { SigninComponent } from './signin/signin.component';


const routes: Routes = [
  { path: 'welcome', component: SigninComponent },
  { path: 'taskList', component: TaskComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
