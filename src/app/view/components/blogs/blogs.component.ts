import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BlogService } from 'src/app/service/blog/blog.service';
import { AlertComponent } from '../../core/alert/alert/alert.component';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {

  loading = false;
  approve = false;

  postList = new Array();

  constructor(private blogService:BlogService,private dialog:MatDialog) { }

  ngOnInit(): void {
    this.getAllPosts();
  }

  getAllPosts(){
    this.loading = true;
    this.postList = new Array();
      this.blogService.getBlogsToApprove("ACTIVE").subscribe(resp => {
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
