import { Injectable } from '@angular/core';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm, FormGroupDirective } from '@angular/forms';
import { HttputilService } from '../httputil.service';
import { NoteResponse } from '../NoteResponse';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from "@angular/material";
import { UpdateComponent } from '../update/update.component';
import { Label } from '../Label';
import { reqLabelDto } from '../reqLabelDto';
import { CollaboratorComponent } from '../collaborator/collaborator.component';
import { CurrentUser } from '../CurrentUser';
import { UrlDTO } from '../UrlDTO';
import { UrlDataRes } from '../UrlDataRes';

@Injectable()
export class noteService {
  statusClass: string;
  LogedUser: CurrentUser;
  showSelected: boolean;
  checked: false;
  UrlDataResList: Array<UrlDataRes> = [];
  gridListStatus: boolean;
  model: any = {};
  status: any = {};
  UrlDTO: any = {};
  Datepicker: any = {};
  notes: NoteResponse[];
  reqLabelDto: any = {};
  labels: Label[];
  userDetails: any = {};
  urlDtoRes: UrlDataRes[];

  constructor(
    private commonService: HttputilService,
    private dialog: MatDialog,
    private collTabdialog: MatDialog) { }


  getNotesOninit(): any {
    return this.commonService.getService('getNotes');
  }

  getClassStatus(): any {
    this.commonService.getStatus().subscribe((status) => {
      this.statusClass = status ? "list-view" : "grid-view";
      if (status) {
        localStorage.setItem('class', 'list-view');
      } else {
        localStorage.setItem('class', 'grid-view');
      }
    });
    return this.statusClass;
  }

  optionSelect(checked, labelId, noteId): any {

    if (checked) {
      this.reqLabelDto.checked = true;
    } else {
      this.reqLabelDto.checked = false;
    }
    this.reqLabelDto.labelId = labelId;
    this.reqLabelDto.noteId = noteId;

    this.commonService.add_remove_label('addRemoveLabel', this.reqLabelDto).subscribe(res => {
        
    });
  }

  AutoRefresh(path): any {
    this.commonService.getAll(path).subscribe(res => {
      return  this.notes = res;
    });
  }
  getData(description, noteId): any {
    if (!description) {
      description = '';
    }
    var string = description.replace(/<[^>]+>/gm, '');

    var urlRegEx = /(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi;

    if (string.match(urlRegEx)) {

      var urlslist = string.match(/\bhttps?:\/\/\S+/gi);

      this.UrlDTO.noteId = noteId;
      this.UrlDTO.urllist = urlslist;

      this.commonService.putService('getdata', this.UrlDTO).toPromise().then(response => {
        this.UrlDataResList.push(response);
      });
    }
    return this.UrlDataResList;

  }
  handleInputChange(event, note) {
    var imageName = event.target.files[0].name;
    var pattern = /image-*/;
    note.image = imageName;
    this.addImage(note);
  }

  addImage(note): void {
    this.commonService.putService('updateNote', note)
      .subscribe(response => {
      });
  };

  createNewLabel(data): void {
    this.commonService.putService('createLabel', data)
      .subscribe(response => {
      });
  };


  openDialog(note) {

    this.dialog.open(UpdateComponent, {
      data: note,
      width: '600px',
      height: '150px'
    });
  }

  openCollaborator(note, ownerId) {
    this.collTabdialog.open(CollaboratorComponent, {
      data: { note, ownerId },
      width: '600px',
      height: '250px'
    });
  }
  createNote(data): any {
    if (data.title || data.description)
      return this.commonService.putService('createNote',data); 
  };
  updateStatusNote(note, status): any {
    note.status = status;
     return this.commonService.putService('updateNote', note);
  };

  reminderSave(note, day):any{

    if (day === 'Today') {
      var today = new Date();
      today.setHours(20);
      today.setMinutes(0);
      today.setMilliseconds(0);
      note.reminder = today;
    }
    else if (day === 'Tomorrow') {
      var today = new Date();
      today.setDate(today.getDate() + 1);
      today.setHours(8);
      today.setMinutes(0);
      today.setMilliseconds(0);
      note.reminder = today;
    } else if (day === 'Next week') {

      var today = new Date();
      today.setDate(today.getDate() + 6);
      today.setHours(8);
      today.setMinutes(0);
      today.setMilliseconds(0);
      note.reminder = today;
    } else if (day === 'null') {
      note.reminder = null;
    } else {
      var dateObj = this.model.reminder;
      var today = new Date(dateObj);
      note.reminder = today;
      this.AutoRefresh('getNotes');
    }
    return this.commonService.putService('updateNote', note);
  }
  refreshNote(): any {
    return this.commonService.getAll('getNotes');
  }
  convertDate(inputFormat) {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat);
    return [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join('/');
  }

  deleteNote(noteId): void {
    this.commonService.deleteService('delete', noteId)
      .subscribe(response => {
      });
  }

  getLabels(): any {
    return this.commonService.getService1('getLabels');
  }
}