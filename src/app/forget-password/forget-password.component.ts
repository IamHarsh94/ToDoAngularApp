import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm, FormGroupDirective } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from "@angular/material";
import { HttputilService } from '../httputil.service';


@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  model: any = {};
  constructor(private commonService: HttputilService) { }

  ngOnInit() {
  }

  submitEmail():void{
    console.log(this.model);
    //document.getElementById('usermail').innerHTML=''; 
    this.commonService.putService('forgotPassword',this.model).subscribe(response => {
      console.log("forgot password response :",response);
    });
  
  }

}
