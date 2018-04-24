
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

  constructor(private http: AuthHttp,private commonService: HttputilService, private router : Router) {
  
    FB.init({
      appId      : '216332969128183',
      status     : false, // the SDK will attempt to get info about the current user immediately after init
      cookie     : false,  // enable cookies to allow the server to access
      // the session
      xfbml      : false,  // With xfbml set to true, the SDK will parse your page's DOM to find and initialize any social plugins that have been added using XFBML
      version    : 'v2.8' // use graph api version 2.5
    });
  } 
// private allLabelSubject = new Subject<any>();

// httpOptions = {
//     headers: new HttpHeaders({
//       'Content-Type':  'application/json',
//       'Authorization': localStorage.getItem('Authorization')
//     })
//   };

//   login(data): void {
    
//     this.commonService.postService('http://localhost:8080/ToDo/login', data).subscribe(response => {
    
//      console.log(response.body);  
//     if (response.body.statusCode === 200) 
//     {
//       localStorage.setItem('Authorization', response.headers.get("Authorization"));
//       location.reload();
//       this.router.navigate(['/home/note']);
        
//       } else if (response.body.statusCode == 400) {
//         alert(response.body.message);
//     }
//   });
// };

login() {
  // this.commonService.facebooklogin('http://localhost:8080/ToDo/facebookwithlogin').subscribe(response => {
  //    if(response.status==200){
  //       console.log("mast re bhai");
  //    }else{
  //       console.log("nhi huwa bhai");
  //    } 
  // });


  return new Promise((resolve, reject) => {
    FB.login(result => {
      console.log(result);
      // if (result.authResponse) {
      //     return this.http.post(`http://localhost:3000/api/auth/facebook`, {access_token: result.authResponse.accessToken})
      //     // , {access_token: result.authResponse.accessToken})
      //     .toPromise()
      //       .then(response => {
      //          console.log(response)

      //          var token = response.headers.get('x-auth-token');
      //           console.log(token)
      //           if (token) {
      //           localStorage.setItem('token', token);
      //         }
      //         resolve(response.json());
      //       })
      //       .catch(() => reject());
      // } else {
      //   reject();
      // }
    }, {scope: 'public_profile,email'})

  });
}

}

