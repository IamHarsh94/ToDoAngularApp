import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm, FormGroupDirective } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { HttputilService } from '../httputil.service';
import { ToDoResponse } from '../ToDoResponse';
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

  constructor(private commonService: HttputilService, private router : Router) { }

  login(): void {
      this.commonService.postService('http://localhost:8080/ToDo/login', this.model).subscribe(response => {
      console.log(response);
      if (response.status === 200) {
        console.log(response.headers.get("Authorization"));
        localStorage.setItem('Authorization', response.headers.get("Authorization"));
        this.router.navigate(['/home/note']);
          
        } else if (response.status !== 200) {
        alert(response.message);
      }
    });
  };

  // login(): void {
  //   console.log("sigInForm", this.model);

  //   this.commonService.postServiceLogin('login', this.model).subscribe(response => {
  //     var toDoResponse = response.body;
  //     if (toDoResponse.statusCode === 200) {
  //       console.log(response.headers.get("Authorization"));
  //       localStorage.setItem('Authorization', response.headers.get("Authorization"));
  //       this.router.navigate(['/home']);
          
  //       } else if (toDoResponse.statusCode !== 200) {
  //       alert(toDoResponse.message);
  //     }
  //   });
  // };



  // email validation pattern using validators
  emailControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
  ]);
  // password validation pattern using validators
  passwordControl = new FormControl('', [
    Validators.required,
    Validators.pattern('.{4,12}'),
  ]);
  matcher = new MyErrorStateMatcher();

}
