import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogsComponent } from './blogs.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BlogsRouterModule } from './blogs-router.module';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [
    BlogsComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatProgressBarModule,
    BlogsRouterModule,
    FlexLayoutModule
  ]
})
export class BlogsModule { }
