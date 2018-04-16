
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { HttputilService } from '../httputil.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Headers } from '@angular/http/src/headers';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class loginService {

  constructor(private commonService: HttputilService, private router : Router) { }

// private allLabelSubject = new Subject<any>();

// httpOptions = {
//     headers: new HttpHeaders({
//       'Content-Type':  'application/json',
//       'Authorization': localStorage.getItem('Authorization')
//     })
//   };

  login(data): void {
    
    this.commonService.postService('http://localhost:8080/ToDo/login', data).subscribe(response => {
   
     console.log(response.body);  
    if (response.body.statusCode === 200) 
    {
      localStorage.setItem('Authorization', response.headers.get("Authorization"));
     
      this.router.navigate(['/home/note']);
        
      } else if (response.body.statusCode == 400) {
        alert(response.body.message);
    }
  });
};
}
