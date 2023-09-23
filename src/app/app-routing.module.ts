import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './layouts/main/main.component';
import { TestComponent } from './pages/test/test.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {
    path: 'app', component: MainComponent, children: [
      { path: 'test', component: TestComponent }
    ]
  },
  {
    path: 'auth', component: AuthComponent, children: [
      { path: 'login', component: LoginComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
