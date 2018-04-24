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
          this.commonService.getUser('getUser/'+this.data.ownerId).subscribe(res => {
          this.CurrentUser= res;
         });
  }

  add_remove_collaborator(userMail) : void {
    if(userMail!='null'){
    
    // this.model.noteId = this.data.note.noteId;
     this.model.removeUserMail=userMail;
    
     this.collaboratorService.addPerson(this.model);
    }
    else{
      // this.model.noteId=this.data.note.noteId;
      this.collaboratorService.addPerson(this.model); 
     }
   
  }
  }

