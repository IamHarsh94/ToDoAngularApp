import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm, FormGroupDirective } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { HttputilService } from '../httputil.service';
import { Router } from '@angular/router';
import { environment } from "../../environments/environment";
@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  model:any={};
  constructor(
    private commonService: HttputilService,
    private router : Router
  ) { }

  ngOnInit() {
    console.log(window.location.search);
  }
 
  resetpassword(){
      
      if(!(this.model.passWord==''||this.model.confirmpassword=='')){
          if(this.model.passWord==this.model.confirmpassword){
              var randomUUID=window.location.search.split('=');
              this.commonService.postService(environment.base_url+'changepassword/'+randomUUID[1],this.model).subscribe(res => {
                console.log(res.body.message);
                if(res.body.statusCode==200){
                  alert(res.body.message); 
                  this.router.navigate(['/login']);
                }else{
                  alert(res.body.message);
                  this.router.navigate(['/login']);
                }
             });
          }   
      }  
    
  }

}
