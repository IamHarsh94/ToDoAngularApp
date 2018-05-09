
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
export class collaboratorService {
 user : User;

  constructor(private commonService: HttputilService, 
    private dialog: MatDialog) {}

  addPerson(data): void {
     this.commonService.putService('addRemovecollaborator', data).subscribe(response => {

     if (response.status === 200)
      { 
        alert(response.message);

      } else if (response.status == 300) {

         alert(response.message);
      }else if(response.status === 201){
        
        alert(response.message);
      }
      else{
        alert(response.message);
      }
     });
 };


// private allLabelSubject = new Subject<any>();

// httpOptions = {
//     headers: new HttpHeaders({
//       'Content-Type':  'application/json',
//       'Authorization': localStorage.getItem('Authorization')
//     })
//   };

 
}
