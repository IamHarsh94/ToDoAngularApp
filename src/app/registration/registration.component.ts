import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators ,NgForm,FormGroupDirective} from '@angular/forms';
import { HttputilService } from '../httputil.service';
import { ErrorStateMatcher } from '@angular/material';
import { Router } from '@angular/router';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers:[HttputilService]
})
export class RegistrationComponent {

  model:any={};
  // constructor(private commonService:HttputilService) { }
  constructor(private commonService:HttputilService, private router : Router) { }
  register(): void {
    console.log("sigInForm", this.model);
    
    this.commonService.postService('http://localhost:8080/ToDo/register', this.model).subscribe(response => {
      if (response.status === 200) {
            console.log("registration success");
            this.router.navigate(['/login']);
            alert('User registration successful..');
        } else if (response.status !== 200) {
          //  console.log(response);
            this.router.navigate(['/register']);
            //alert(response.message);
      }
    });
  };



  // register(): void {
  //   console.log("sigInForm", this.model);
    
  //   this.commonService.postServiceRegister('register', this.model).subscribe(response => {
  //     var toDoResponse = response.body;
  //     if (toDoResponse.statusCode === 200) {
  //           console.log("registration success");
  //       } else if (toDoResponse.statusCode !== 200) {
  //           alert(toDoResponse.message);
  //     }
  //   });
  // };
    emailControl = new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
    ]);
    // password validation pattern using validators
    passwordControl = new FormControl('', [
     Validators.required,
     Validators.pattern('.{4,12}'),
    ]);
    ConfirmPasswordControl = new FormControl('', [
     Validators.required,
     Validators.pattern('.{4,12}'),
     // this.module.password!=this.module.ConfirmPassword,
    ]);
    FullnameControl = new FormControl('', [
     Validators.required,
    ]);
    AddressControl=new FormControl('',[
     Validators.required,
    ]);
    matcher = new MyErrorStateMatcher();
}
