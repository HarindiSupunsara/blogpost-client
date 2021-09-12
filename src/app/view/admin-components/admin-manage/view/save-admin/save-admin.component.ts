import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin/admin.service';
import { AlertComponent } from 'src/app/view/core/alert/alert/alert.component';

@Component({
  selector: 'app-save-admin',
  templateUrl: './save-admin.component.html',
  styleUrls: ['./save-admin.component.css']
})
export class SaveAdminComponent implements OnInit {

  screenName: string = "";
  editId: string = "";

  loading = false;

  signupForm = new FormGroup({
    fName: new FormControl("", Validators.required),
    lName: new FormControl("", Validators.required),
    email: new FormControl(""),
    mobile: new FormControl(""),
    userName: new FormControl(""),
    password: new FormControl("", Validators.required),
    passwordConfirm: new FormControl(),
  });

  get fName() {
    return this.signupForm.get("fName");
  }

  get lName() {
    return this.signupForm.get("lName");
  }

  get email() {
    return this.signupForm.get("email");
  }

  get mobile() {
    return this.signupForm.get("mobile");
  }

  get SUserName() {
    return this.signupForm.get("userName");
  }

  get SPassword() {
    return this.signupForm.get("password");
  }

  get passwordConfirm() {
    return this.signupForm.get("passwordConfirm");
  }

  editAdmin: any | undefined;

  constructor(private routes: ActivatedRoute, private adminService: AdminService, private dialog: MatDialog, private router: Router) {
    this.routes.params.subscribe(param => {
      this.editId = param.data;
      (this.editId != undefined) ? this.screenName = "Edit Admin" : this.screenName = "New Admin";
      console.log(this.editId);

      if (this.editId != undefined && this.editId != null) {
        this.getAdminUser();
      }

    });
  }

  ngOnInit(): void {
  }

  getAdminUser() {
    this.loading = true;
    this.adminService.getAdmin(parseInt(this.editId)).subscribe((response: any) => {
      console.log(response);
      this.loading = false;
      if (response != null) {
        this.editAdmin = response;

        this.fName?.setValue(this.editAdmin.firstName);
        this.lName?.setValue(this.editAdmin.lastName);
        this.email?.setValue(this.editAdmin.email);
        this.mobile?.setValue(this.editAdmin.mobile);
        this.SUserName?.setValue(this.editAdmin.userName);
        //this.SPassword?.setValue(this.editAdmin.fname);
      }
    }, (error: any) => {
      this.loading = false;
      this.alert("Failed", error.message, "error", "");
    });
  }


  save() {
    if (this.signupForm.valid && ((this.email?.value != undefined && this.email?.value != null && this.email?.value != "") || (this.mobile?.value != undefined && this.mobile?.value != null && this.mobile?.value != "")
      || (this.SUserName?.value != undefined && this.SUserName?.value != null && this.SUserName?.value != ""))) {
      if (this.SPassword?.value == this.passwordConfirm?.value) {

        if (this.editId != undefined && this.editId != null) {
          this.editAdmin.firstName = this.fName?.value;
          this.editAdmin.lastName = this.lName?.value;
          this.editAdmin.email = this.email?.value;
          this.editAdmin.mobile = this.mobile?.value;
          this.editAdmin.userName = this.SUserName?.value;
          this.editAdmin.password = this.SPassword?.value;
        } else {
          this.editAdmin = new Object();
          this.editAdmin.id = null;
          this.editAdmin.firstName = this.fName?.value;
          this.editAdmin.lastName = this.lName?.value;
          this.editAdmin.email = this.email?.value;
          this.editAdmin.mobile = this.mobile?.value;
          this.editAdmin.userName = this.SUserName?.value;
          this.editAdmin.password = this.SPassword?.value;
        }
        console.log(this.editAdmin);
        this.loading = true;
        this.adminService.saveAdmin(this.editAdmin).subscribe((response: any) => {
          this.loading = false;
          if (response.status == "200") {
            this.alert("Success", "User Saved Successfully..", "success", "");
            this.router.navigate(['admin-home']);
          } else {
            this.alert("Failed", response.message, "error", "");
          }
        }, (error: any) => {
          this.loading = false;
          this.alert("Failed", error.message, "error", "");
        });
      } else {
        this.alert("Error", "Password not match with confirm password..", "error", "");
      }
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

