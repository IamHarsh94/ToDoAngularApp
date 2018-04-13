import { Component, OnInit } from '@angular/core';
import { HttputilService } from '../httputil.service';
import { CurrentUser } from '../CurrentUser';
import { collaboratorService } from './collaborators';
@Component({
  selector: 'app-collaborator',
  templateUrl: './collaborator.component.html',
  styleUrls: ['./collaborator.component.css']
})
export class CollaboratorComponent implements OnInit {

  constructor( private commonService: HttputilService,private collaboratorService:collaboratorService) { }
  public CurrentUser;
  model: any = {};
  ngOnInit() {
      this.commonService.getUser('getUser').subscribe(res => {
       this.CurrentUser= res;
    });
  }

  submitEmail() : void{
    this.collaboratorService.addPerson(this.model);
  }
}
