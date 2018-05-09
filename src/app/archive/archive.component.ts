import { Component, OnInit, Inject } from '@angular/core';
import { HttputilService } from '../httputil.service';
import { NoteResponse } from '../NoteResponse';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from "@angular/material";
import { UpdateComponent } from '../update/update.component';
import {ArchiveService} from '../archive/archiveService';

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
  constructor(
    private commonService:HttputilService,
    private dialog: MatDialog,
    private ArchiveService:ArchiveService) { }

  ngOnInit() {
    this.commonService.getService('getNotes').subscribe(res => {
      this.notes = res;
      console.log('get all notes check here:', res);
    });
  }

  refreshNote(): void {
    this.ArchiveService.refreshNote();
  };

  unArchiveNote(note): void {
    this.ArchiveService.unArchiveNote(note);
  };

  pinNote(note): void {
   this.ArchiveService.pinNote(note);
  };

  openDialog(note) {
    this.dialog.open(UpdateComponent, {
      data: note,
      width: '600px',
      height: '150px'
    });
  }
}
