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
  Datepicker:any={};
  notes: NoteResponse[];
  trashImg = '/assets/icon/archive.svg';
  pinSvg = '/assets/icon/pin.svg';
  unpinSvg = '/assets/icon/pinblue.svg';
  remenderSvg = '/assets/icon/remender.svg';
  clearSvg = '/assets/icon/clear.svg';
  //dependencies pass in contructor params
  constructor(private commonService: HttputilService, private dialog: MatDialog) { }

  ngOnInit() {
      this.commonService.getService('getNotes').subscribe(res => {
      this.notes = res;
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
      // let validDate =this.convertDate(dateObj); 
      var today = new Date(dateObj);
      
      // today.setDate(parseInt(newDt));
      // console.log("Date obj ",today);
      
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
}
