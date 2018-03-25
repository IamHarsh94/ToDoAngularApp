import { Component, OnInit, Inject } from '@angular/core';
import { HttputilService } from '../httputil.service';
import { NoteResponse } from '../NoteResponse';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from "@angular/material";
import { UpdateComponent } from '../update/update.component';

@Component({
  selector: 'app-archive',
  templateUrl:'./archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {

  
  model: any = {};
  notes: NoteResponse[];
  unArchiveImg = '/assets/icon/unarchive.svg';
  pinSvg = '/assets/icon/pin.svg';
  constructor(private commonService:HttputilService,private dialog: MatDialog) { }

  ngOnInit() {
    this.commonService.getService('getNotes').subscribe(res => {
      this.notes = res;
      console.log('get all notes check here:', res);
    });
  }

  refreshNote(): void {
    this.commonService.getService('getNotes').subscribe(res => {
      this.notes = res;
    });
  };

  unArchiveNote(note): void {
    console.log("move trash note", note);
    note.status = 0;
    this.commonService.putService('updateNote', note).subscribe(response => {
      console.log("unArchive note", response);
      this.refreshNote();
    });
  };

  pinNote(note): void {
    console.log("move trash note", note);
    note.status = 3;
    this.commonService.putService('updateNote', note).subscribe(response => {
      console.log("unArchive note", response);
      this.refreshNote();
    });
  };

  openDialog(note) {
    console.log(note);

    this.dialog.open(UpdateComponent, {
      data: note,

      width: '600px',
      height: '150px'
    });
  }
}
