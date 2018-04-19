import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttputilService } from '../httputil.service';
import { NoteResponse } from '../NoteResponse';
import { Label } from '../Label';
import { CurrentUser } from '../CurrentUser';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from "@angular/material";
import { LabelComponent } from '../label/label.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{
public CurrentUser;
labels: Label[];
  constructor( private commonService: HttputilService, private router : Router, private dialog: MatDialog) { }
  
  ngOnInit() {
    this.commonService.getService1('getLabels').subscribe(res => {
    this.labels = res;
    });
  }

  getLogedUser():void{
    this.commonService.getUser('getUser').subscribe(res => {
     this.CurrentUser= res;
    });
  }
  
  signOut() : void{
    
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  openLabelDialog() {
    this.dialog.open(LabelComponent, {
     
      width: '400px',
      height: '210px'
    });
    // this.refreshNote();
  }
  changeCSS(){
    this.commonService.toggleView();
  }
  // refreshNote(): void {
  //   this.commonService.getService1('getLabels').subscribe(res => {
  //     this.labels = res;
  //   });
  // };
  
}
