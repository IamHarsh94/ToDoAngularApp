
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { CurrentUser } from './CurrentUser';
import { Observable } from 'rxjs/Observable';
import { NoteResponse } from './NoteResponse';
import { Headers } from '@angular/http/src/headers';
import { Subject } from 'rxjs/Subject';
import { environment } from "../environments/environment";
import {AuthorisationToken} from "../app/AuthorisationToken";
@Injectable()
export class HttputilService {

  base_url = environment.base_url;
  note_url=environment.note_url;
  user_Url=environment.user_Url;
  private urlpath;  
  private noteId;
  status:boolean = true;  

constructor(private http: HttpClient,private tokenService:AuthorisationToken) { }
    
private allLabelSubject = new Subject<any>();

private viewSubject = new Subject<any>();

private refreshLabels = new Subject<any>();

httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

CreateToken():void{
 if(this.tokenService.getToken()){
   this.httpOptions.headers=this.httpOptions.headers.set('Authorization',this.tokenService.getToken());     
  }
}

toggleView(){
  this.status = !this.status;
  this.viewSubject.next(this.status);
}

getStatus(){
  setTimeout(this.toggleView.bind(this));
  return this.viewSubject.asObservable();
}

// getLabels(path):any{
//   this.urlpath = this.note_url.concat(path);
//   this.CreateToken();
//   this.http.get<any>(this.urlpath,this.httpOptions).toPromise().then((res)=>{
//   this.allLabelSubject.next(res);
//   });
//  }

loadAllLabel(path):void {
  this.urlpath = this.note_url.concat(path);
  this.CreateToken();
  this.http.get<any>(this.urlpath,this.httpOptions).toPromise().then((res)=>{
  this.allLabelSubject.next(res);
  });
}

getAll(path):any {
  this.loadAllLabel(path);
  return this.allLabelSubject.asObservable(); 
}

AutoLoadLabels(path):void {
  this.urlpath = this.note_url.concat(path);
  this.CreateToken();
  this.http.get<any>(this.urlpath,this.httpOptions).toPromise().then((res)=>{
  this.refreshLabels.next(res);
  });
}

getAutoLoadLabels(){
  setTimeout(this.AutoLoadLabels.bind(this));
  return this.refreshLabels.asObservable();
}


 
  //--------------  POST SERVICE ------------------------
  postService(url,obj):Observable<any>{
    return this.http.post<any>(url, obj,{ observe: 'response' });
  }

  //--------------  PUT SERVICE ------------------------

  putService(path, data): Observable<any>{ /// this method should be use
    this.urlpath = this.note_url.concat(path);
    this.CreateToken();
    return this.http.put<any>(this.urlpath,data,this.httpOptions);
  }

  forgotPassword(path,data):Observable<any>{
    this.urlpath = this.base_url.concat(path);
    this.CreateToken();
    return this.http.put<any>( this.urlpath,data);
    
  }
  add_remove_label(path,data):Observable<any>{
    this.urlpath = this.note_url.concat(path);
    this.CreateToken();
    return this.http.put<any>(this.urlpath, data, this.httpOptions);
  }
  // addcollaborator(path,data):Observable<any>{ 
  //   this.urlpath = this.note_url.concat(path);
  //   this.CreateToken();
  //   return this.http.put(this.urlpath,data,this.httpOptions);
  // }

  // addurl(path,data):Observable<any>{
  //   this.urlpath = this.note_url.concat(path);
  //   this.CreateToken();
  //   return this.http.put<any>( this.urlpath,data,this.httpOptions);
  // }
  //--------------  GET SERVICE -----------------------------
  
    getService(path): Observable<any>{
         this.urlpath = this.note_url.concat(path);
         this.CreateToken();
         return this.http.get<any>(this.urlpath,this.httpOptions);    
     }
     
  //  getService(path): Observable<NoteResponse[]>{
  //     this.urlpath = this.note_url.concat(path);
  //     this.CreateToken();
  //     return this.http.get<NoteResponse[]>(this.urlpath,this.httpOptions);    
  // }

   getService1(path): Observable<any>{
      this.urlpath = this.note_url.concat(path);
      this.CreateToken();
      return this.http.get<any>(this.urlpath,this.httpOptions);    
    }
  
  //--------------  DELETE SERVICE ------------------------

   deleteService(path,noteId):Observable<any>{
     this.urlpath = this.note_url.concat(path);
     this.CreateToken();
      return  this.http.delete<any>( this.urlpath+'/'+noteId,this.httpOptions);
   }

//------------------------- USER OPERATION -------------------------// 

getUser(path): Observable<CurrentUser>{
  this.urlpath = this.user_Url.concat(path);
  this.CreateToken();
  return this.http.get<CurrentUser>(this.urlpath,this.httpOptions);    
}


 putService1(path):Observable<any>{
  this.urlpath = this.note_url.concat(path);
  this.CreateToken();
    return this.http.get<any>(this.urlpath,this.httpOptions); 
 }

 
  
}