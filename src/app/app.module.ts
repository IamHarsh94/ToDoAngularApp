import { BrowserModule } from '@angular/platform-browser';
import { ClickOutsideModule } from 'ng-click-outside';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { DatePipe } from '@angular/common';
import {
  MatButtonModule, MatFormFieldModule,
  MatInputModule, MatToolbarModule, MatSidenavModule,
  MatIconModule, MatCardModule, MatSelectModule, MatMenuModule,
  MatDialogModule,MatGridListModule,MatDatepickerModule,MatNativeDateModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegistrationComponent } from './registration/registration.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { HttputilService } from './httputil.service';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { NoteComponent } from './note/note.component';
import { AuthGuard,LoggedInAuthGuard } from './auth/index';
import { UpdateComponent } from './update/update.component';
import { TrashComponent } from './trash/trash.component';
import { ArchiveComponent } from './archive/archive.component';
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
      {path:'archive',component:ArchiveComponent}
    ],

  },
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
    ArchiveComponent
  ],
  imports: [
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
    MatNativeDateModule

  ],
  entryComponents:[UpdateComponent],
  providers: [HttputilService,AuthGuard,LoggedInAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
