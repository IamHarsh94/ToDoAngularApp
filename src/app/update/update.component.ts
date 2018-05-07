import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { HttputilService } from '../httputil.service';
import { NoteResponse } from '../NoteResponse';
import { UrlDTO } from '../UrlDTO';
import { UrlDataRes } from '../UrlDataRes';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  UrlDTO: any = {};
  urlDtoRes:UrlDataRes[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: NoteResponse,
    private commonService: HttputilService,
    public MatRef: MatDialogRef<UpdateComponent>) {

  }

  ngOnInit() {
    document.getElementById('update-title').innerHTML = this.data.title;
    document.getElementById('update-description').innerHTML = this.data.description;
  }

  updateNote() {
    // console.log("before ", document.getElementById('update-description').innerHTML);

    // var str = document.getElementById('update-description').innerHTML;
    // var string = str.replace(/<[^>]+>/gm, '');

    // var urlRegEx = /(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi;

    // if (string.match(urlRegEx)) {

    //   var urlslist = string.match(/\bhttps?:\/\/\S+/gi);
    //   this.UrlDTO.noteId = this.data.noteId;
    //   this.UrlDTO.urls=urlslist;

    //   console.log("yaaahoooooo",this.UrlDTO);

    //    this.commonService.putService('getdata', this.UrlDTO)
    //      .subscribe(response => {
    //        console.log('expected output mil gya yaahooooo',response);
    //       this.urlDtoRes=response;
    //      });
    // }
     this.commonService.putService('updateNote', this.data)
       .subscribe(response => {
         this.MatRef.close();
      });
  }

  removeImage() {
    this.data.image = null;
    this.commonService.putService('updateNote', this.data)
      .subscribe(response => {
        console.log(response);
      });
  }
}