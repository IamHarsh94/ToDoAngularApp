import { BrowserModule } from '@angular/platform-browser';
import { ClickOutsideModule } from 'ng-click-outside';
import { NgModule } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { DatePipe } from '@angular/common';
import {
  MatButtonModule, MatFormFieldModule,MatCheckboxModule,
  MatInputModule, MatToolbarModule, MatSidenavModule,MatChipsModule,
  MatIconModule, MatCardModule, MatSelectModule, MatMenuModule,
  MatDialogModule,MatGridListModule,MatDatepickerModule,MatNativeDateModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegistrationComponent } from './registration/registration.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { Http ,HttpModule} from '@angular/http'
import { HttputilService } from './httputil.service';
import { HttpClientModule} from '@angular/common/http';

import { HomeComponent } from './home/home.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { NoteComponent } from './note/note.component';
import { AuthGuard,LoggedInAuthGuard } from './auth/index';
import { UpdateComponent } from './update/update.component';
import { TrashComponent } from './trash/trash.component';
import { ArchiveComponent } from './archive/archive.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { RemindersComponent } from './reminders/reminders.component';
import { LabelComponent } from './label/label.component';
import {DropdownModule} from "ngx-dropdown";
import { CollaboratorComponent } from './collaborator/collaborator.component';
import { NoteFilterPipe } from './note-filter.pipe';
import {loginService} from './login/loginService';
import {noteService} from './note/noteService';
import {collaboratorService} from './collaborator/collaboratorService';
import { CommonNoteComponent } from './common-note/common-note.component';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider, 
  LinkedInLoginProvider  } from 'angularx-social-login';
import { SocialLoginModule } from 'angularx-social-login';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import {AuthorisationToken} from "../app/AuthorisationToken";
import {LabelService} from './label/labelService';
import {ArchiveService} from './archive/archiveService';
import {ForgotPasswordService} from './forget-password/forgotPasswordService';
import {HomeService} from './home/homeService';
import { ColorToolDirective } from './color-tool.directive';
import { NgMatSearchBarModule } from 'ng-mat-search-bar';


export function getAuthHttp(http: Http) {
  return new AuthHttp(new AuthConfig({
    headerName: 'x-auth-token',
    noTokenScheme: true,
    noJwtError: true,
    globalHeaders: [{'Accept': 'application/json'}],
    tokenGetter: (() => localStorage.getItem('id_token')),
  }), http);
}

const config = new AuthServiceConfig([
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('216332969128183')
  }
]);
  export function provideConfig() {
  return config;
}

// import{MatFormsModule,MatFormFieldModule,MatInputModule} from '@angular/material';
// import{FormsModule} from '@angular/forms';
// import{MatAnimationsModule} from '@angular/platform-browser/animations';
// Route Configuration
export const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'register', component: RegistrationComponent},
  { path: 'login', component: LoginComponent ,canActivate : [LoggedInAuthGuard]},
  {path: 'home', component: WelcomeComponent,
  canActivate: [ AuthGuard ],
   children: [
      { path: '', redirectTo: 'note', pathMatch: 'full'},
      { path: 'note', component: NoteComponent},
      {path:'trash',component:TrashComponent},
      {path:'archive',component:ArchiveComponent},
      {path:'Reminders',component:RemindersComponent},
    ],

  },
  {path:'resetpassword',component:ResetpasswordComponent},
 { path: '**', component: HomeComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    HomeComponent,
    WelcomeComponent,
    NoteComponent,
    UpdateComponent,
    TrashComponent,
    ArchiveComponent,
    RemindersComponent,
    LabelComponent,
    CollaboratorComponent,
    NoteFilterPipe,
    CommonNoteComponent,
    ForgetPasswordComponent,
    ResetpasswordComponent,
    ColorToolDirective
    
  ],
  imports: [
    SocialLoginModule.initialize(config),
    SocialLoginModule,
    BrowserModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatIconModule,
    FlexLayoutModule,
    RouterModule.forRoot(appRoutes),
    MatCardModule,
    HttpClientModule,
    MatToolbarModule,
    MatSidenavModule,
    ClickOutsideModule,
    MatSelectModule,
    MatMenuModule,
    MatDialogModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    DropdownModule,
    MatCheckboxModule,
    MatChipsModule,
    HttpModule,
    NgMatSearchBarModule
    ],
  entryComponents:[UpdateComponent,LabelComponent,CollaboratorComponent,ForgetPasswordComponent],
  providers: [HttputilService,AuthGuard,LoggedInAuthGuard,loginService,noteService,AuthorisationToken,
    ForgotPasswordService,ArchiveService, LabelService, collaboratorService,{ provide: AuthHttp, useFactory: getAuthHttp, deps: [Http] },
    HomeService,
    { provide: AuthServiceConfig, useFactory: provideConfig}],
  bootstrap: [AppComponent]
})
export class AppModule { }
