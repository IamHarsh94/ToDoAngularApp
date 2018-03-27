import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{

  constructor(  private router : Router) { }
  

  refresh(): void {
    location.reload();
  }
  
  signOut() : void{
    
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  
}
