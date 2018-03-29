import { Component, OnInit } from '@angular/core';
import { HttputilService } from '../httputil.service';
import { NoteResponse } from '../NoteResponse';

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.css']
})
export class RemindersComponent implements OnInit {

  notes: NoteResponse[];
  model: any = {};
  status:any={};
  Datepicker:any={};

  trashImg = '/assets/icon/archive.svg';
  pinSvg = '/assets/icon/pin.svg';
  unpinSvg = '/assets/icon/pinblue.svg';
  remenderSvg = '/assets/icon/remender.svg';
  clearSvg = '/assets/icon/clear.svg';
  constructor(private commonService: HttputilService) { }
  ngOnInit() {
    this.commonService.getService('getNotes').subscribe(res => {
    this.notes = res;
  });
}

refreshNote(): void {
  this.commonService.getService('getNotes').subscribe(res => {
    this.notes = res;
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
     console.log("Note obj ",note);
   
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


}
