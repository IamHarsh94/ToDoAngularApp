import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm, FormGroupDirective } from '@angular/forms';
import { HttputilService } from '../httputil.service';
import { NoteResponse } from '../NoteResponse';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from "@angular/material";
import { UpdateComponent } from '../update/update.component';

//Decorator
@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
/**class used for ....purpose*/
export class NoteComponent implements OnInit {

  model: any = {};
  status:any={};
  today:Date;
  notes: NoteResponse[];
  trashImg = '/assets/icon/archive.svg';
  pinSvg = '/assets/icon/pin.svg';
  unpinSvg = '/assets/icon/pinblue.svg';
  remenderSvg = '/assets/icon/remender.svg';
  //dependencies pass in contructor params
  constructor(private commonService: HttputilService, private dialog: MatDialog) { }

  ngOnInit() {
      this.commonService.getService('getNotes').subscribe(res => {
      this.notes = res;
      console.log('get all notes check here:', res);
    });
  }
  /**purpose*/
  openDialog(note) {

    this.dialog.open(UpdateComponent, {
      data: note,

      width: '600px',
      height: '150px'
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

  reminderSave(note){
   this.today =new Date();
   note.reminder= this.today;
   console.log(this.today);
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

}
