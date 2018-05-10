
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
import { UrlDTO } from '../UrlDTO';
import { Label } from '../Label';
@Injectable()
export class LabelService {
  labels: Label[];
  constructor(private commonService: HttputilService, private dialog: MatDialog) {}
  public UrlDTO :UrlDTO;
  
  createDeleteLabel(data): void {
     this.commonService.putService('createLabel', data)
     .subscribe(response => {
      this.commonService.AutoLoadLabels('getLabels');
     });
 };

  getLabels():any{
   return this.commonService.getService1('getLabels');
  } 
 

//  addImage(note): void {
//   this.commonService.putService('updateNote',note)
//   .subscribe(response => {
//     console.log("Image response :",response);
//   });
// };
}