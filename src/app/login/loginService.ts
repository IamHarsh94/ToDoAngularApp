
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { HttputilService } from '../httputil.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Headers } from '@angular/http/src/headers';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/toPromise';
import { AuthHttp } from 'angular2-jwt';
import {environment} from '../../environments/environment';
declare const FB:any;

@Injectable()
export class loginService {

  constructor(private http: AuthHttp,
      private commonService: HttputilService,
      private router : Router) {

   (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = '//connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
}

   login(data): void {
     this.commonService.postService( environment.base_url + '/login', data).subscribe(response => {
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

