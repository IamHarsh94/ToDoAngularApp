import { Component, OnInit,Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm, FormGroupDirective } from '@angular/forms';
import { HttputilService } from '../httputil.service';
import { NoteResponse } from '../NoteResponse';
import {MatDialog, MatDialogConfig,MAT_DIALOG_DATA} from "@angular/material";
import { UpdateComponent } from '../update/update.component'

//Decorator
@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
/**class used for ....purpose*/
export class NoteComponent implements OnInit{
 
  model: any = {};
  notes: NoteResponse[];
  //dependencies pass in contructor params
  constructor(private commonService:HttputilService,private dialog: MatDialog) { }

   ngOnInit(){
     this.commonService.getAllNotes('getNotes').subscribe(res => {
    this.notes = res;
   });
   }

  /**purpose*/ 
  openDialog(note) {
    console.log(note);
    
    this.dialog.open(UpdateComponent, {
       data:note,
  
      width:'600px',
      height:'150px'
    });
  }

  /**purpose*/
   refreshNote(): void {
    this.commonService.getAllNotes('getNotes').subscribe(res => {
    this.notes = res;
 });
};
   /**purpse*/
  createNote(): void {  
        this.commonService.createNote('createNote', this.model)
        .subscribe(response => {
         console.log("Note Created",response);
         this.refreshNote();
       });
      
   };

 /**purpose*/
  deleteNote(noteId): void{
      console.log("noteId",noteId);
        this.commonService.deleteNote('deleteNote',noteId).subscribe(response=>{
          console.log("deleteNote  response",response);
          this.refreshNote();
        });
      
  };
}
