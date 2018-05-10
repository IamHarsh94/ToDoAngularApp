
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
export class AuthorisationToken {

constructor() { }
  
getToken(){
  return localStorage.getItem('Authorization');
}
}