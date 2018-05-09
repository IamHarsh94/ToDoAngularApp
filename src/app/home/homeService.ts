import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttputilService } from '../httputil.service';
import { NoteResponse } from '../NoteResponse';
import { Label } from '../Label';
import { CurrentUser } from '../CurrentUser';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from "@angular/material";
import { LabelComponent } from '../label/label.component';

@Injectable()
export class HomeService {

    public CurrentUser;
    labels: Label[];

    constructor(
        private commonService: HttputilService,
        private router: Router,
        private dialog: MatDialog) { }

     getLabels():any{
        return this.commonService.getService1('getLabels');
     }  
     loadLabels():any{
        return this.commonService.getAutoLoadLabels();
      }
    getLogedUser():void {
        this.commonService.getUser('getUser').subscribe(res => {
            this.CurrentUser = res;
        });
    }

    signOut(): void {
        localStorage.removeItem('Authorization');
        this.router.navigate(['/login']);
    }

    openLabelDialog() {
        this.dialog.open(LabelComponent, {

            // width: '400px',
            // height: '210px'
        });
    }
    changeCSS() {
        this.commonService.toggleView();
    }


}
