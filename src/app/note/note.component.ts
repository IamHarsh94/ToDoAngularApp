import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm, FormGroupDirective } from '@angular/forms';
import { HttputilService } from '../httputil.service';
import { NoteResponse } from '../NoteResponse';
import { Label } from '../Label';
import { reqLabelDto } from '../reqLabelDto';
import { CollaboratorComponent } from '../collaborator/collaborator.component';
import { noteService } from './noteService';
import { UrlDataRes } from '../UrlDataRes';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})

export class NoteComponent implements OnInit {
  statusClass : string=localStorage.getItem('class');
  model: any = {};
  notes: NoteResponse[];
  labels: Label[];
  UrlDataResList : Array<UrlDataRes>=[];
  trashImg = '/assets/icon/archive.svg';
  pinSvg = '/assets/icon/pin.svg';
  unpinSvg = '/assets/icon/pinblue.svg';
  remenderSvg = '/assets/icon/remender.svg';
  clearSvg = '/assets/icon/clear.svg';
  constructor(
    private noteService: noteService,
    private commonService: HttputilService,
  ) {}
  
  ngOnInit() {
    this.noteService.getNotesOninit().subscribe(res => {
      this.notes=res;
      this.notes.forEach(obj=>{
        this.UrlDataResList=this.noteService.getData(obj.description,obj.noteId);
      });
    });
    this.statusClass=this.noteService.getClassStatus();
    this.getAllLabels('getNotes');
  }

  optionSelect(checked,labelId,noteId):void{
    this.noteService.optionSelect(checked,labelId,noteId);
    this.getAllLabels('getNotes');
  }

  handleInputChange(event,note) {
    this.noteService.handleInputChange(event,note);
  }
  getAllLabels(path):void{
    this.commonService.getAll(path).subscribe(res=> {
    this.notes=res;
    });
  }
  createLabel(): void {
    this.noteService.createNewLabel(this.model);
 };

  openDialog(note) {
    this.noteService.openDialog(note);
  }

  openCollaborator(note,ownerId) {
    this.noteService.openCollaborator(note,ownerId);
  }
  createNote(): void {
    this.noteService.createNote(this.model).subscribe(response => {
      document.getElementById('note-title').innerHTML = '';
      document.getElementById('note-description').innerHTML = '';
      this.AutoReload();    
    });;
  };

  updateStatusNote(note,status): void {
    this.noteService.updateStatusNote(note,status).subscribe(response => {
      this.AutoReload();    
    });
  };
  AutoReload(): void {
    this.noteService.refreshNote().subscribe(res => {
      this.notes = res;
    });
  }
  reminderSave(note,day){
    this.noteService.reminderSave(note,day).subscribe(response => {
      this.AutoReload();
     });
  }

  getLabels(){
    this.noteService.getLabels().subscribe(res => {
      this.labels = res;
    });
  }

  deleteService(noteId){
    this.noteService.deleteNote(noteId);
    this.notes=this.noteService.AutoRefresh('getNotes');
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
