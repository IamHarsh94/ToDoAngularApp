import { Component, OnInit,Inject } from '@angular/core';
import {MAT_DIALOG_DATA,MatDialogRef} from '@angular/material';
import { HttputilService } from '../httputil.service';
import { NoteResponse } from '../NoteResponse';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
//  model:any={};

constructor(@Inject(MAT_DIALOG_DATA)  public data: NoteResponse, private commonService:HttputilService,
public MatRef:MatDialogRef<UpdateComponent>) {
    
   }
  
  ngOnInit() {
    //this.model = this.data;
    document.getElementById('update-title').innerHTML = this.data.title;
    document.getElementById('update-description').innerHTML = this.data.description;
  }

  
  updateNote(){
    console.log("yes got the data",this.data);
    this.commonService.putService('updateNote',this.data)
    .subscribe(response => {
     console.log("Note update",response);
     this.MatRef.close();
   });

  }
}