import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxAutoScrollModule } from "ngx-auto-scroll";

import { AppComponent } from './app.component';
import { PostComponent } from './post/post.component';
import { PostListComponent } from './post-list/post-list.component';
import { NewPostInputComponent } from './new-post-input/new-post-input.component';

import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';
import { PostService } from './post.service';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    PostListComponent,
    NewPostInputComponent,
    LoginComponent,
    HomeComponent,
  ],
  imports: [
      AppRoutingModule,
      BrowserModule,
      FormsModule,
      HttpClientModule,
      JwtModule.forRoot({
          config: {
              tokenGetter: () => {
                  return localStorage.getItem('id_token');
              },
              whitelistedDomains: ['localhost:8000']
          }
      }),
      NgxAutoScrollModule,
      ReactiveFormsModule,
  ],
  providers: [
      AuthService,
      AuthGuardService,
      PostService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
