import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from 'src/app/service/blog/blog.service';
import { AlertComponent } from 'src/app/view/core/alert/alert/alert.component';

@Component({
  selector: 'app-save-my-blogs',
  templateUrl: './save-my-blogs.component.html',
  styleUrls: ['./save-my-blogs.component.css']
})
export class SaveMyBlogsComponent implements OnInit {

  screenName: string = "";
  editId: string = "";

  loading = false;

  postForm = new FormGroup({
    title: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required),
    category: new FormControl("", Validators.required)
  });

  get title() {
    return this.postForm.get("title");
  }

  get description() {
    return this.postForm.get("description");
  }

  get category() {
    return this.postForm.get("category");
  }

  editPost: any | undefined;

  categoryList = new Array();

  constructor(private routes: ActivatedRoute, private blogService: BlogService, private dialog: MatDialog, private router: Router) {
    this.routes.params.subscribe(param => {
      this.editId = param.data;
      (this.editId != undefined) ? this.screenName = "Edit Post" : this.screenName = "New Post";
      console.log(this.editId);

      if (this.editId != undefined && this.editId != null) {
        this.getPost();
      }

    });
  }

  ngOnInit(): void {
    this.getAllCategory();
  }

  getAllCategory(){
    this.loading = true;
    this.blogService.getAllCategory().subscribe(resp => {
      this.loading = false;
      console.log(resp);
      if (resp != null) {
        resp.forEach((element: any) => {
          this.categoryList.push(element);
        });
      }
    }, error => {
      this.loading = false;
      this.alert("Failed", error.message, "error", "");
    });
  }

  getPost() {
    this.loading = true;
    this.blogService.getPost(parseInt(this.editId)).subscribe((response: any) => {
      console.log(response);
      this.loading = false;
      if (response != null) {
        this.editPost = response;
        this.title?.setValue(this.editPost.header);
        this.description?.setValue(this.editPost.description);
        this.category?.setValue(this.editPost.category);
      }
    }, (error: any) => {
      this.loading = false;
      this.alert("Failed", error.message, "error", "");
    });
  }


  save() {
    if (this.postForm.valid){

        if (this.editId != undefined && this.editId != null) {
          this.editPost.header = this.title?.value;
          this.editPost.description = this.description?.value;
          this.editPost.userId = sessionStorage.getItem("id");
          this.editPost.categoryId = this.category?.value;
        } else {
          this.editPost = new Object();
          this.editPost.id = null;
          this.editPost.header = this.title?.value;
          this.editPost.description = this.description?.value;
          this.editPost.userId = sessionStorage.getItem("id");
          this.editPost.categoryId = this.category?.value;
        }
        console.log(this.editPost);
        this.loading = true;
        this.blogService.saveBlog(this.editPost).subscribe((response: any) => {
          this.loading = false;
          if (response.status == "200") {
            this.alert("Success", "Post Saved Successfully..", "success", "");
            this.router.navigate(['home']);
          } else {
            this.alert("Failed", response.message, "error", "");
          }
        }, (error: any) => {
          this.loading = false;
          this.alert("Failed", error.message, "error", "");
        });

    } else {
      this.alert("Error", "Please fill all required data..", "error", "");
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


}
