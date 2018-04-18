import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm, FormGroupDirective } from '@angular/forms';
import { HttputilService } from '../httputil.service';
import { NoteResponse } from '../NoteResponse';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from "@angular/material";
import { UpdateComponent } from '../update/update.component';
import { Label } from '../Label';
import { reqLabelDto } from '../reqLabelDto';
import { CollaboratorComponent } from '../collaborator/collaborator.component';

import { noteService } from './noteService';
//Decorator
@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
/**class used for ....purpose*/
export class NoteComponent implements OnInit {
  showSelected: boolean;
  checked : false;
  model: any = {};
  status:any={};
  Datepicker:any={};
  notes: NoteResponse[];
  reqLabelDto:any={};
  labels: Label[];
  trashImg = '/assets/icon/archive.svg';
  pinSvg = '/assets/icon/pin.svg';
  unpinSvg = '/assets/icon/pinblue.svg';
  remenderSvg = '/assets/icon/remender.svg';
  clearSvg = '/assets/icon/clear.svg';
 
  //public checked:boolean=false;
 
  constructor(
    private commonService: HttputilService,
    private noteService: noteService ,
    private dialog: MatDialog,
    private collabdialog:MatDialog
  ) {}
   
  optionSelect(checked,labelId,noteId):void{
    
      if(checked){
        this.reqLabelDto.checked=true;
      }else{
        this.reqLabelDto.checked=false;
      }
      this.reqLabelDto.labelId=labelId;  
      this.reqLabelDto.noteId=noteId;

      this.commonService.add_remove_label('addRemoveLabel',this.reqLabelDto).subscribe(res => {
        console.log(res);
        this.getAllLabels('getNotes');
      });
     
  }
  ngOnInit() {
     
     console.log(this.notes); this.commonService.getService('getNotes').subscribe(res => {
      this.notes = res;

     this.getAllLabels('getNotes');
    });
  }
  createLabel(): void {
    this.noteService.createNewLabel(this.model);
 };

  getAllLabels(path):void{
    this.commonService.getAll(path).subscribe(res=> {
    this.notes=res;
    });
  }

  openDialog(note) {

    this.dialog.open(UpdateComponent, {
      data: note,
      
      width: '600px',
      height: '150px'
    });
  }
  openCollaborator(note,ownerId) {

     this.collabdialog.open(CollaboratorComponent, {
       data: {note,ownerId},

       width: '600px',
       height: '250px'
     });
  }

  /**purpose*/
  refreshNote(): void {
    this.commonService.getService('getNotes').subscribe(res => {
      this.notes = res;
    });
  };

  /**purpse*/
  createNote(): void {
    this.commonService.putService('createNote', this.model)
      .subscribe(response => {
        console.log("Note Created", response);
        this.refreshNote();
      });

  };

  updateStatusNote(note,status): void {
    console.log("move archive note", note,status);
    note.status = status;
    this.commonService.putService('updateNote', note).subscribe(response => {
      console.log("Archive  response", response);
      this.refreshNote();
    });
  };

  reminderSave(note,day){
    
    if(day==='Today'){
    var today =new Date();
    today.setHours(20);
    today.setMinutes(0);
    today.setMilliseconds(0);
    note.reminder= today;   
    }
    else if(day==='Tomorrow'){
      var today =new Date();
      today.setDate(today.getDate()+1);
    today.setHours(8);
    today.setMinutes(0);
    today.setMilliseconds(0);
    note.reminder= today;
    }else if(day==='Next week'){
      
      var today =new Date();
      today.setDate(today.getDate()+6);
      today.setHours(8);
      today.setMinutes(0);
      today.setMilliseconds(0);
      note.reminder= today;  
    }else if(day==='null'){
      note.reminder=null;
    }else{
      var dateObj = this.model.reminder;
      var today = new Date(dateObj);
      note.reminder= today;
      this.refreshNote();
    }
       this.commonService.putService('updateNote', note).subscribe(response => {
       console.log("Archive  response", response);
      this.refreshNote();
      });
  }

  colors = [{
    color: '#f26f75',
    path: 'assets/icon/Red.png'
  }, {
    color: '#fcff77',
    path: 'assets/icon/lightyellow.png'
  }, {
    color: '#80ff80',
    path: '/assets/icon/green.png'
  }, {
    color: '#9ee0ff',
    path: '/assets/icon/blue.png'
  }, {
    color: '#7daaf2',
    path: '/assets/icon/darkblue.png'
  }, {
    color: '#9966ff',
    path: '/assets/icon/purple.png'
  }, {
    color: '#ff99cc',
    path: '/assets/icon/pink.png'
  }, {
    color: '#bfbfbf',
    path: '/assets/icon/grey.png'
  }, {
    color: '#ffffff',
    path: '/assets/icon/white.png'
  }, {
    color: '#a52a2a',
    path: '/assets/icon/brown.png'
  }
  ];

   convertDate(inputFormat) {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat);
    return [d.getFullYear(),pad(d.getMonth()+1),pad(d.getDate())].join('/');
  }
  getLabels(){
    this.commonService.getService1('getLabels').subscribe(res => {
      this.labels = res;
    });
  }

}
