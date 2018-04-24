import { Component, OnInit,Output } from '@angular/core';
import { HttputilService } from '../httputil.service';
import {MAT_DIALOG_DATA,MatDialogRef} from '@angular/material';
import { Label } from '../Label';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.css']
})
export class LabelComponent implements OnInit {
  model: any = {};
  constructor(private commonService: HttputilService,public MatRef:MatDialogRef<LabelComponent>) { }

  ngOnInit() {
  }

  createLabel(): void {

     this.commonService.putService('createLabel', this.model)
      .subscribe(response => {
        console.log("Label Created", response);

        this.MatRef.close();
        
      });
  };
}
