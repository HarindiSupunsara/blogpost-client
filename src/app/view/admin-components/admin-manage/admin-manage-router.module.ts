import { NgModule } from '@angular/core';
import { AdminManageComponent } from './view/admin-manage.component';
import { RouterModule, Routes } from '@angular/router';
import { ViewAdminComponent } from './view/view-admin/view-admin.component';
import { SaveAdminComponent } from './view/save-admin/save-admin.component';

const routes: Routes = [
  {
    path:'',
    component: AdminManageComponent,
    children: [
      {
        path: '',
        component : ViewAdminComponent,
      },
      {
        path: 'save-admin',
        component : SaveAdminComponent,
      },
      {
        path: 'save-admin/:data',
        component : SaveAdminComponent,
      }
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminManageRouterModule { }
