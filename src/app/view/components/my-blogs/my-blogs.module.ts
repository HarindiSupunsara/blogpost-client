import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRippleModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MyBlogsRouterModule } from './my-blogs-router.module';
import { MyBlogsComponent } from './view/my-blogs.component';
import { ViewMyBlogsComponent } from './view/view-my-blogs/view-my-blogs.component';
import { SaveMyBlogsComponent } from './view/save-my-blogs/save-my-blogs.component';



@NgModule({
  declarations: [
    MyBlogsComponent,
    ViewMyBlogsComponent,
    SaveMyBlogsComponent
  ],
  imports: [
    CommonModule,
    MyBlogsRouterModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatProgressBarModule,
    MatGridListModule,
    MatButtonToggleModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatSelectModule,
    MatExpansionModule,
    MatRippleModule,
    MatDialogModule,
    FlexLayoutModule
  ]
})
export class MyBlogsModule { }
