import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './admin-home.component';



const routes: Routes = [
  {
    path: '',
    component : AdminHomeComponent,
    children : [
      {
        path: '',
        loadChildren : () => import('./../../admin-components/dashboard/dashboard.module').then(d => d.DashboardModule)
      },
      {
        path: 'dashboard',
        loadChildren : () => import('./../../admin-components/dashboard/dashboard.module').then(d => d.DashboardModule)
      },
      {
        path: 'admin-manage',
        loadChildren : () => import('./../../admin-components/admin-manage/admin-manage.module').then(d => d.AdminManageModule)
      }
    ]

  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminHomeRouterModule { }
