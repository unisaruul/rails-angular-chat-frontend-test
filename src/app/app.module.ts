import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ChatComponent } from './chat/chat.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule, HttpHeaders} from "@angular/common/http";
import {ApiService} from "./service/api.service";
import {HttpErrorInterceptor} from "./interceptor/HttpErrorInterceptor";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {ChatService} from "./service/chat.service";
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChatComponent,
    UserComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
    ],
  providers: [ApiService, HttpClientModule, { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }, ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
