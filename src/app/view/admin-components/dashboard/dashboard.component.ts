import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { BlogService } from 'src/app/service/blog/blog.service';
import { AlertComponent } from '../../core/alert/alert/alert.component';
import { ConfirmationAlertComponent } from '../../core/alert/confirmation-alert/confirmation-alert.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {

  loading = false;
  approve: any = false;;

  constructor(private blogService:BlogService,private dialog:MatDialog) { }

  blogList = new Array();

  ngAfterViewInit(): void {
    this.getAllActiveContesters();
    
  }

  getAllActiveContesters() {
    this.loading = true;
    this.blogList = new Array();
    this.blogService.getBlogsToApprove("INACTIVE").subscribe(resp => {
      this.loading = false;
      console.log(resp);
      if (resp != null) {
        resp.forEach((element: any) => {
          this.blogList.push(element);
        });
      }
    }, (error: any) => {
      this.loading = false;
      this.alert("Failed", error.message, "error", "");
    });
  }

  changeBlogStatus(row: any, e: any) {
    console.log(row);
    console.log(e);
    console.log(e);
    if (!this.approve) {
      this.alertconfirmation("Are you sure!", ["Do you want to change the status?"], "success", "", row, e);
    }
    if (this.approve) {
      this.approve = false;
      this.blogService.approveBlog(row.id, row.status).subscribe((response:any) => {
        if (response.status == "200") {
          this.getAllActiveContesters();
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

    dialogRef.afterClosed().subscribe((result: any) => {

      if (result.result === "yes") {
        row.status = e.value;

        this.approve = true;
        this.changeBlogStatus(row, e);
      } else {
        let toggle = e.source;
        if (toggle) {
          let group = toggle.buttonToggleGroup;
          console.log(group);
          group.value = row.status;
        }

        this.approve = false;
      }

    });

  }

}
