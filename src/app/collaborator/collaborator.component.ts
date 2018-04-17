import { Component, OnInit,Inject} from '@angular/core';
import { HttputilService } from '../httputil.service';
import { CurrentUser } from '../CurrentUser';
import { collaboratorService } from './collaborators';
import {MAT_DIALOG_DATA,MatDialogRef} from '@angular/material';
import { NoteResponse } from '../NoteResponse';

@Component({
  selector: 'app-collaborator',
  templateUrl: './collaborator.component.html',
  styleUrls: ['./collaborator.component.css']
})
export class CollaboratorComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA)  public data: NoteResponse,
    private commonService: HttputilService,
    private collaboratorService:collaboratorService,
    public MatRef:MatDialogRef<CollaboratorComponent>
  ) { }
  
  public CurrentUser;
  model: any = {};
  
  ngOnInit() {
     console.log("note id in collaborator component",this.data);
     console.log(this.data.nodeId);
     console.log(this.data.ownerId);
    
         this.commonService.getUser('getUser/'+this.data.ownerId).subscribe(res => {
           this.CurrentUser= res;
         });
      
  }

  submitEmail() : void{
    this.model.noteId=this.data.nodeId;
    this.collaboratorService.addPerson(this.model);
  }
}
