import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm, FormGroupDirective } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from "@angular/material";
import {ForgotPasswordService} from '../forget-password/forgotPasswordService';


@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  model: any = {};
  constructor(
    private ForgotPasswordService:ForgotPasswordService) { }

  ngOnInit() {
  }

  submitEmail():void{
   this.ForgotPasswordService.submitEmail(this.model);
  }

}
