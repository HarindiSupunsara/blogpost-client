import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading = false;

  error = "";

  loginForm = new FormGroup({
    userName: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
  });

  signupForm = new FormGroup({
    fName: new FormControl("", Validators.required),
    lName: new FormControl("", Validators.required),
    email: new FormControl(""),
    mobile: new FormControl(""),
    userName: new FormControl(""),
    password: new FormControl("", Validators.required),
    passwordConfirm: new FormControl(),
  });

  showSignup: boolean = false;
  sError: string = "";

  get userName() {
    return this.loginForm.get("userName");
  }

  get password() {
    return this.loginForm.get("password");
  }

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

  constructor(private loginService: AuthService, private router: Router,private _snackBar: MatSnackBar) {
    
  }

  ngOnInit() {
  }

  signin() {
    this.loading = true;
    if(this.loginForm.valid){
      this.loginService.login(this.userName?.value, this.password?.value).subscribe(resp => {
        this.loading = false;
        console.log(resp);

        if(resp.status == '200'){
          sessionStorage.setItem("user" ,resp.data.id);
          sessionStorage.setItem("id" ,resp.data.id);
          sessionStorage.setItem("token", resp.data.token);
          sessionStorage.setItem("isAdmin", resp.data.admin);
          if(resp.data.isSuperAdmin != undefined && resp.data.isSuperAdmin != null){
            sessionStorage.setItem("isSuperAdmin", resp.data.isSuperAdmin);
          }

          if(resp.data.admin == true){
            this.router.navigate(['/admin-home']);
          }else{
            this.router.navigate(['/home']);
          }
        } else{
          this.openSnackBar("You have entered username or password incorrectly..","ok");
          //this.error = "You have entered username or password incorrectly..";
        }
      }, error => {
        this.loading = false;
        console.log(error);
      });
    }

  }

  createaccount(){
    this.showSignup = true;
  }

  signinInstead(){
    this.showSignup = false;
  }

  signup(){
    if(this.signupForm.valid && ((this.email?.value != undefined && this.email?.value != null && this.email?.value != "") || (this.mobile?.value != undefined && this.mobile?.value != null && this.mobile?.value != "") 
    || (this.SUserName?.value != undefined && this.SUserName?.value != null && this.SUserName?.value != ""))){
      if(this.SPassword?.value == this.passwordConfirm?.value){
        this.loading = true;
        let obj = {
          "userName" : this.SUserName?.value,
          "password" : this.SPassword?.value,
          "email" : this.email?.value,
          "firstName" : this.fName?.value,
          "lastName" : this.lName?.value,
          "mobile" : this.mobile?.value
        }
        console.log(obj);
        this.loginService.signUp(obj).subscribe(resp => {
          this.loading = false;
          if(resp.status == '200'){
            this.openSnackBar("Successfully Registered","ok");
            this.showSignup = false;
          }
        }, error => {
          this.loading = false;
          console.log(error);
        });
      }else{
        this.openSnackBar("Password not match with confirm password","ok");
        //this.sError = "Password not match with confirm password";
      }
    }else{
      this.openSnackBar("Fill all required data","ok");
      //this.sError = "Fill all required data";
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  // changePassword() {

  //   console.log("change Call");

  //   if (this.newPassword.value == this.newPasswordConfirm.value) {
  //     console.log("equal");
  //     this.loginService.changePassword(this.userName.value, this.password.value,
  //       this.newPassword.value, this.newPasswordConfirm.value).subscribe(response => {

  //         this.password.setValue("");
  //         this.newPassword.setValue("");
  //         this.newPasswordConfirm.setValue("");

  //         this.loginResponse.IsExpired = response.json().expired;
  //         this.loginResponse.IsLogin = response.json().login;


  //       });
  //   }
  // }

}
