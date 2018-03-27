
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { ToDoResponse } from './ToDoResponse';
import { Observable } from 'rxjs/Observable';
import { NoteResponse } from './NoteResponse';
import { Headers } from '@angular/http/src/headers';

@Injectable()
export class HttputilService {
  base_url = "http://localhost:8080/ToDo/";
  note_url = "http://localhost:8080/ToDo/note/";
  private urlpath;
  private noteId;
  constructor(private http: HttpClient) { }

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
}