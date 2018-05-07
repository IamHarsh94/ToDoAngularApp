
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
@Injectable()
export class noteService {
    
  constructor(private commonService: HttputilService, private dialog: MatDialog) {}
  public UrlDTO :UrlDTO;
  createNewLabel(data): void {
     this.commonService.putService('createLabel', data)
     .subscribe(response => {
     });
 };

 addImage(note): void {
  this.commonService.putService('updateNote',note)
  .subscribe(response => {
    console.log("Image response :",response);
  });
};

geturlData(description : string): Observable<any> {
  var url = this.urlify(description);
  if(!url){
    let subjectObj = new Subject<any>();
    return subjectObj.asObservable();
  }
  return this.commonService.addurl('getdata',url)
}

  urlify(text) :Array<string> {
  var urlRegex = /(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi;
  return text.match(urlRegex);
  }

  deleteNote(noteId): void {
    this.commonService.deleteService('delete',noteId)
    .subscribe(response => {
    });
// private allLabelSubject = new Subject<any>();

// httpOptions = {
//     headers: new HttpHeaders({
//       'Content-Type':  'application/json',
//       'Authorization': localStorage.getItem('Authorization')
//     })
//   };

 
}
}