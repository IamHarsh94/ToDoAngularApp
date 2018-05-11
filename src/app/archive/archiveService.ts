
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
import { NoteResponse } from '../NoteResponse';
@Injectable()
export class ArchiveService {
   
 notes: NoteResponse[];
  constructor(
      private commonService: HttputilService, 
      private dialog: MatDialog) {}

      public UrlDTO :UrlDTO;
  
      // refreshNote(): void {
      //   this.commonService.getService('getNotes').subscribe(res => {
      //     this.notes = res;
      //   });
      // };
      refreshNote(): any {
        return this.commonService.getAll('getNotes');
      }
      unArchiveNote(note): any {
        note.status = 0;
        return this.commonService.putService('updateNote', note);
      };
    
      pinNote(note): void {
        note.status = 3;
        this.commonService.putService('updateNote', note).subscribe(response => {
          console.log("unArchive note", response);
          this.refreshNote();
        });
      };
}