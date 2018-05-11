import { Component, OnInit,Input,Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm, FormGroupDirective } from '@angular/forms';
import { HttputilService } from '../httputil.service';
import { NoteResponse } from '../NoteResponse';
import { Label } from '../Label';
import { reqLabelDto } from '../reqLabelDto';
import { CollaboratorComponent } from '../collaborator/collaborator.component';
import { noteService } from '../note/noteService';
import { UrlDataRes } from '../UrlDataRes';

@Component({
  selector: 'app-common-note',
  templateUrl: './common-note.component.html',
  styleUrls: ['./common-note.component.css']
})
export class CommonNoteComponent implements OnInit {
  @Input() note : any;
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
    
  }
  
  isPin(note):any{
      if(note.status==0){
          return this.pinSvg;
      }else if(note.status==3){
          return this.unpinSvg;
      }
  }

  pinUnpin(note){
    if(note.status){
        this.updateStatusNote(note,0);
      }else{
        this.updateStatusNote(note,3);
    }
  }
  updateStatusNote(note,status):any{
    this.noteService.updateStatusNote(note,status).subscribe(response => {
      this.getAllLabels('getNotes');
     });
  };
  getAllLabels(path):void{
    this.commonService.getAll(path).subscribe(res=> {
    this.notes=res;
    });
  }
  AutoReload(): void {  
    this.noteService.refreshNote().subscribe(res => {
      this.notes = res;
    });
  }
  optionSelect(checked,labelId,noteId):void{
    this.noteService.optionSelect(checked,labelId,noteId);
    this.getAllLabels('getNotes');
  }

  handleInputChange(event,note) {
    this.noteService.handleInputChange(event,note);
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
    this.noteService.createNote(this.model) .subscribe(response => {
      this.model = {};
      this.AutoReload();    
  });
   
  };

  
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
    this.AutoReload();
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
