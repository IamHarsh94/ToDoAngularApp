
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

@Injectable()
export class collaboratorService {

  constructor(private commonService: HttputilService, 
    private dialog: MatDialog) {}

  addPerson(data): void {
     this.commonService.addcollaborator('addcollaborator', data).subscribe(response => {
     if (response.status === 200)
      { // get the collaborators from db 
        
      } else if (response.status == 300) {
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
