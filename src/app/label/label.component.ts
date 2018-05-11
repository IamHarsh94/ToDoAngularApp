import { Component, OnInit,Output } from '@angular/core';
import { HttputilService } from '../httputil.service';
import {MAT_DIALOG_DATA,MatDialogRef} from '@angular/material';
import { Label } from '../Label';
import {LabelService} from '../label/labelService';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.css']
})

export class LabelComponent implements OnInit {
  model: any = {};
  labels: Label[];
  simbol :string="label";
  constructor(
    private LabelService:LabelService,
    private commonService: HttputilService,
    public MatRef:MatDialogRef<LabelComponent>) { }

  ngOnInit() {
    this.LabelService.getLabels().subscribe(res => {
      this.labels = res;
    });
  }
  mouseover(){
    this.simbol="delete";
  }
  mouseleave(){
    this.simbol="label";
  }
  createLabel(): void {
     if(this.model.labelTitle){
       this.LabelService.createDeleteLabel(this.model);
     }
     this.MatRef.close();
  };

  
  updateLabel(label):void{
    this.LabelService.updatelabel(label);
  }

   deleteLabel(label){
     this.model.labelId = label.labelId;
     this.model.user = label.user;
     this.model.deleteLabel = 'true';
     this.LabelService.createDeleteLabel(this.model);
     this.LabelService.getLabels().subscribe(res => {
       this.labels = res;
     });
   }
 
}
