
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { CurrentUser } from './CurrentUser';
import { Observable } from 'rxjs/Observable';
import { NoteResponse } from './NoteResponse';
import { Headers } from '@angular/http/src/headers';
import { Subject } from 'rxjs/Subject';//hamid sir added
import { environment } from "../environments/environment"

@Injectable()
export class HttputilService {
  
  base_url = environment.base_url; 
  //base_url = "http://localhost:8080/ToDo/";
  note_url = "http://localhost:8080/ToDo/note/";
  user_Url="http://localhost:8080/ToDo/user/";
  private urlpath;
  private noteId;
  status:boolean = true;  
constructor(private http: HttpClient) { }
    
private allLabelSubject = new Subject<any>();

private viewSubject = new Subject<any>();

toggleView(){
  this.status = !this.status;
  this.viewSubject.next(this.status);
}

getStatus(){
  setTimeout(this.toggleView);
  return this.viewSubject.asObservable();
}

loadAllLabel(path):void {
  this.urlpath = this.note_url.concat(path);
  this.http.get<any>(this.urlpath,this.httpOptions).toPromise().then((res)=>{
  this.allLabelSubject.next(res);
});
}


getAll(path): Observable<any> {
  this.loadAllLabel(path);
  return this.allLabelSubject.asObservable(); 
}


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': localStorage.getItem('Authorization')
    })
  };

  //--------------  POST SERVICE ------------------------
  postService(url,obj):Observable<any>{
    return this.http.post<any>(url, obj,{ observe: 'response' });
  }

  //--------------  PUT SERVICE ------------------------
  
  putService(path, note): Observable<any>{
    this.urlpath = this.note_url.concat(path);
    return this.http.put(this.urlpath, note, this.httpOptions);
  }


  //--------------  GET SERVICE -----------------------------
  
   getService(path): Observable<NoteResponse[]>{
      this.urlpath = this.note_url.concat(path);
      return this.http.get<NoteResponse[]>(this.urlpath,this.httpOptions);    

    }
  //--------------  DELETE SERVICE ------------------------

   deleteService(path,noteId):Observable<any>{
     this.urlpath = this.note_url.concat(path);
      return  this.http.delete<any>( this.urlpath+'/'+noteId,this.httpOptions);
   }

//------------------------- USER OPERATION -------------------------// 

getUser(path): Observable<CurrentUser>{
  this.urlpath = this.user_Url.concat(path);
  return this.http.get<CurrentUser>(this.urlpath,this.httpOptions);    
}

getService1(path): Observable<any>{
  this.urlpath = this.note_url.concat(path);
    return this.http.get<any>(this.urlpath,this.httpOptions);    
  }

 putService1(path):Observable<any>{
  this.urlpath = this.note_url.concat(path);
    return this.http.get<any>(this.urlpath,this.httpOptions); 
 }

  add_remove_label(path,object):Observable<any>{
    this.urlpath = this.note_url.concat(path);
    return this.http.put(this.urlpath, object, this.httpOptions);
  }

  addcollaborator(path,data):Observable<any>{
    this.urlpath = this.note_url.concat(path);
    return this.http.put(this.urlpath,data,this.httpOptions);
  }
}