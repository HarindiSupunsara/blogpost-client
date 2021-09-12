import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/app/service/admin/admin.service';
import { AlertComponent } from 'src/app/view/core/alert/alert/alert.component';
import { ConfirmationAlertComponent } from 'src/app/view/core/alert/confirmation-alert/confirmation-alert.component';

@Component({
  selector: 'app-view-admin',
  templateUrl: './view-admin.component.html',
  styleUrls: ['./view-admin.component.css']
})
export class ViewAdminComponent implements OnInit {

  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['fname','lname', 'email','mobile','username','createDate','status','edit'];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  userList: Array<any> = new Array();

  approve = false;

  loading = false;

  length = 0;

  constructor(private adminService: AdminService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getAllAdminUsers();
  }

  getAllAdminUsers() {
    this.loading = true;
    this.userList = new Array();
    this.adminService.getCount().subscribe(response => {
      console.log(response);
      this.length = response.data.Count;
      this.adminService.getAllAdminUsers().subscribe(resp => {
        this.loading = false;
        console.log(resp);
        if (resp != null) {
          resp.forEach((element: any) => {
            this.userList.push(element);
          });

          this.dataSource = new MatTableDataSource(this.userList);
          this.dataSource.paginator = this.paginator;
        }
      }, error => {
        this.loading = false;
        this.alert("Failed", error.message, "error", "");
      });
    }, error => {
      this.loading = false;
      this.alert("Failed", error.message, "error", "");
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (this.dataSource) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  }


  changeAdminStatus(row: any, e: any) {
    console.log(e);
    if (!this.approve) {
      this.alertconfirmation("Are you sure!", ["Do you want to change the status?"], "success", "", row, e);
    }
    if (this.approve) {
      console.log(row);
      this.approve = false;
      this.adminService.changeStatus(row.id, row.status).subscribe((response:any) => {
        if (response.status == "200") {
          this.getAllAdminUsers();
          this.alert("Success", "Status changed successfully", "success", "");
          this.approve = false;
        } else {
          this.alert("Failed", response.message , "error", "");

        }

      }, (error:any) => {
        this.alert("Failed", error.message, "error", "");
      });
    }
  }

  loadNextData() {
    this.getAllAdminUsers();
  }

  alertconfirmation(title: string, message: string[], type: string, method: string, row: any, e: any) {
    console.log(row);
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: method,
      title: title,
      message: message,
      type: type
    };

    const dialogRef = this.dialog.open(ConfirmationAlertComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result:any) => {

      if (result.result === "yes") {
        if (e.checked) {
          row.status = 1;
        } else {
          row.status = 0;
        }
        this.approve = true;
        this.changeAdminStatus(row, e);
      } else {
        if (row.status == 1) {
          row.status = 0;
        } else {
          row.status = 1;
        }

        this.approve = false;
      }

    });

  }

  /**
   * Alerts add employee component
   * @param title 
   * @param message 
   * @param type 
   * @param id 
   */
  alert(title: string, message: string, type: string, id: string) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: id,
      title: title,
      message: message,
      type: type
    };

    const dialogRef = this.dialog.open(AlertComponent, dialogConfig);
  }

}
