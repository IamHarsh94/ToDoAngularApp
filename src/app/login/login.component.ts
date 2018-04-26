import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm, FormGroupDirective } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { loginService } from './loginService';
import { Router } from '@angular/router';


export class MyErrorStateMatcher implements ErrorStateMatcher {

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  model: any = {};

  constructor(private loginService: loginService, private router : Router) { }

   userLogin():void{
      this.loginService.login(this.model);
   };
    
  // fbLogin() {
  //     this.loginService.loginwithFB()
  //                      .then(() => {
  //     this.router.navigate(['/home']);
  //   });
  //  }


    

  emailControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
  ]);
  
  passwordControl = new FormControl('', [
    Validators.required,
    Validators.pattern('.{4,12}'),
  ]);
  matcher = new MyErrorStateMatcher();

}
