import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';


const routes: Routes = [
  {
    path: '',
    component : HomeComponent,
    children : [
      {
        path: '',
        loadChildren : () => import('./../../components/blogs/blogs.module').then(d => d.BlogsModule)
      },
      {
        path: 'blogs',
        loadChildren : () => import('./../../components/blogs/blogs.module').then(d => d.BlogsModule)
      },
      {
        path: 'my-blogs',
        loadChildren : () => import('./../../components/my-blogs/my-blogs.module').then(d => d.MyBlogsModule)
      }
    ]

  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class HomeRouterModule { }
