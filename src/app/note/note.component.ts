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
  notes: NoteResponse[];
  trashImg = '/assets/icon/archive.svg';
  pinSvg = '/assets/icon/pin.svg';
  unpinSvg = '/assets/icon/pinblue.svg';
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
    console.log(note);

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

  /**purpose*/
  moveToTrash(note): void {
    console.log("move trash note", note);
    note.status = 1;
    this.commonService.putService('updateNote', note).subscribe(response => {
      console.log("deleteNote  response", response);
      this.refreshNote();
    });
  };

  archiveNote(note): void {
    console.log("move archive note", note);
    note.status = 2;
    this.commonService.putService('updateNote', note).subscribe(response => {
      console.log("Archive  response", response);
      this.refreshNote();
    });
  };

  pinNote(note): void {
    console.log("move archive note", note);
    note.status = 3;
    this.commonService.putService('updateNote', note).subscribe(response => {
      console.log("pin note response", response);
      this.refreshNote();
    });
  };

  unPinNote(note): void {
    console.log("move archive note", note);
    note.status = 0;
    this.commonService.putService('updateNote', note).subscribe(response => {
      console.log("pin note response", response);
      this.refreshNote();
    });
  };

  updateNote(note) {
    console.log("yes got the data", note);
    this.commonService.putService('updateNote', note)
      .subscribe(response => {
        console.log("Note update with color", response);
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
