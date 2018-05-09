
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { HttputilService } from '../httputil.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Headers } from '@angular/http/src/headers';
import { Subject } from 'rxjs/Subject';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from "@angular/material";
import {User}from '../collaboratorRes';
@Injectable()
export class ForgotPasswordService {
 user : User;

  constructor(private commonService: HttputilService, 
    private dialog: MatDialog) {}

  
    submitEmail(data):void{
        this.commonService.putService('forgotPassword',data).subscribe(response => {
          console.log("forgot password response :",response);
        });
      
      }
 
}
