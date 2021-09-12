import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyBlogsComponent } from './view/my-blogs.component';
import { ViewMyBlogsComponent } from './view/view-my-blogs/view-my-blogs.component';
import { SaveMyBlogsComponent } from './view/save-my-blogs/save-my-blogs.component';


const routes: Routes = [
  {
    path:'',
    component: MyBlogsComponent,
    children: [
      {
        path: '',
        component : ViewMyBlogsComponent,
      },
      {
        path: 'save-blog',
        component : SaveMyBlogsComponent,
      },
      {
        path: 'save-blog/:data',
        component : SaveMyBlogsComponent,
      }
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyBlogsRouterModule { }
