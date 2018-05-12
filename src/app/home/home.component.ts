import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttputilService } from '../httputil.service';
import { NoteResponse } from '../NoteResponse';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from "@angular/material";
import { LabelComponent } from '../label/label.component';
import { HomeService } from './homeService';
import { Label } from '../Label';
import {FormsModule, FormGroup, FormControl, FormBuilder} from '@angular/forms'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  public CurrentUser;
  labels: Label[];

  homeForm: FormGroup;
  inputFormControl: FormControl;
  
  constructor(
    private builder: FormBuilder,
    private HomeService: HomeService,
    private commonService: HttputilService)   {

      this.inputFormControl = new FormControl();
      this.homeForm = this.builder.group({
      inputFormControl: this.inputFormControl //get home html input
      });  }

  ngOnInit() {
    this.HomeService.getLabels().subscribe(res => {
      this.labels = res;
    });
    this.loadLabels();
    this.searchText();
  }
  searchText(){
    this.homeForm.valueChanges.subscribe(
      (formData) => {
        console.log(formData.inputFormControl);
        this.commonService.onDataChangeInSearch(formData.inputFormControl);
      });
  }
  loadLabels(){
     this.labels = this.HomeService.loadLabels().subscribe(res => {
      this.labels = res;
     });
  }

  getLogedUser() {
    this.HomeService.getLogedUser();
  }

  signOut(): void {
    this.HomeService.signOut();
  }

  openLabelDialog() {
    this.HomeService.openLabelDialog();
  }
  changeCSS() {
    this.HomeService.changeCSS();
  }
}
