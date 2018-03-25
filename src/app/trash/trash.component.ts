import { Component, OnInit } from '@angular/core';
import { NoteResponse } from '../NoteResponse';
import { HttputilService } from '../httputil.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.css']
})

export class TrashComponent implements OnInit {

  notes: NoteResponse[];
  constructor(private commonService:HttputilService) { }

  ngOnInit(){
    this.commonService.getService('getNotes').subscribe(res => {
   this.notes = res;
  });
  }

refreshNote(): void {
    this.commonService.getService('getNotes').subscribe(res => {
    this.notes = res;
 });
};
  
deleteForever(noteId): void{
    console.log("noteId",noteId);
      this.commonService.deleteService('delete',noteId).subscribe(response=>{
        console.log("deleteNote  response",response);
         this.refreshNote();
    });
};
  
restore(note): void{
    console.log("restore from trash note",note);
    note.status=0;
      this.commonService.putService('updateNote',note).subscribe(response=>{
        console.log("deleteNote  response",response);
         this.refreshNote();
    });
};

}