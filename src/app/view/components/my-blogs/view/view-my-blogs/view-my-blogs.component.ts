import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BlogService } from 'src/app/service/blog/blog.service';
import { AlertComponent } from 'src/app/view/core/alert/alert/alert.component';
import { ConfirmationAlertComponent } from 'src/app/view/core/alert/confirmation-alert/confirmation-alert.component';

@Component({
  selector: 'app-view-my-blogs',
  templateUrl: './view-my-blogs.component.html',
  styleUrls: ['./view-my-blogs.component.css']
})
export class ViewMyBlogsComponent implements OnInit {

  loading = false;
  approve = false;

  postList = new Array();

  constructor(private blogService:BlogService,private dialog:MatDialog) { }

  ngOnInit(): void {
    this.myBlogs();
  }

  myBlogs(){
    this.loading = true;
    this.postList = new Array();
      this.blogService.myBlogs().subscribe(resp => {
        this.loading = false;
        console.log(resp);
        if (resp != null) {
          resp.forEach((element: any) => {
            this.postList.push(element);
          });
        }
      }, error => {
        this.loading = false;
        this.alert("Failed", error.message, "error", "");
      });
  }

  changePostStatus(row: any, e: any) {
    console.log(e);
    if (!this.approve) {
      this.alertconfirmation("Are you sure!", ["Do you want to change the status?"], "success", "", row, e);
    }
    if (this.approve) {
      console.log(row);
      this.approve = false;
      this.blogService.changeStatus(row.id, row.status).subscribe((response:any) => {
        if (response.status == "200") {
          this.myBlogs();
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
        this.changePostStatus(row, e);
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
