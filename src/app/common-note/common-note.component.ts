import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-common-note',
  templateUrl: './common-note.component.html',
  styleUrls: ['./common-note.component.css']
})
export class CommonNoteComponent implements OnInit {
  @Input() note : any;
  constructor() { }

  ngOnInit() {
  }

}
