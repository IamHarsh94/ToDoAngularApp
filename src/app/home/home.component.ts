import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttputilService } from '../httputil.service';
import { NoteResponse } from '../NoteResponse';
import { CurrentUser } from '../CurrentUser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{
 CurrentUser;
  constructor( private commonService: HttputilService, private router : Router) { }
  
  ngOnInit() {
    
  }

  getLogedUser():void{
    this.commonService.getLogedUser('getUser').subscribe(res => {
      this.CurrentUser= res;
    });
  }
  // refresh(): void {
  //   location.reload();
  // }
  
  signOut() : void{
    
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  
}
