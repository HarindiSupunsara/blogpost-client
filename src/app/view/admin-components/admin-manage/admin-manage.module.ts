import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewAdminComponent } from './view/view-admin/view-admin.component';
import { AdminManageComponent } from './view/admin-manage.component';
import { SaveAdminComponent } from './view/save-admin/save-admin.component';
import { AdminManageRouterModule } from './admin-manage-router.module';
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



@NgModule({
  declarations: [
    AdminManageComponent,
    ViewAdminComponent,
    SaveAdminComponent
  ],
  imports: [
    CommonModule,
    AdminManageRouterModule,
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
export class AdminManageModule { }
