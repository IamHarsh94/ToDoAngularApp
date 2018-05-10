
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

  //  window.fbAsyncInit = () => {
  //   FB.init({
  //     appId      : '216332969128183',
  //     status     : false, // the SDK will attempt to get info about the current user immediately after init
  //     cookie     : false,  // enable cookies to allow the server to access
  //     // the session
  //     xfbml      : false,  // With xfbml set to true, the SDK will parse your page's DOM to find and initialize any social plugins that have been added using XFBML
  //     version    : 'v2.8' // use graph api version 2.5
  //   });
  //   FB.AppEvents.logPageView();
  //  };

  } 
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

// loginwithFB() {
//   return new Promise((resolve, reject) => { 
      
//       FB.login(result => {
//       console.log(result);
        
      

//     }, {scope: 'public_profile,email'})

//   });
// }

}

