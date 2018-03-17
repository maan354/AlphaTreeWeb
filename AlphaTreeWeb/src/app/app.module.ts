import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { ResultComponentComponent } from './result-component/result-component.component';
import { ProfileComponentComponent } from './profile-component/profile-component.component';
import { RegistrationComponentComponent } from './registration-component/registration-component.component';
import { ResetPasswordComponentComponent } from './reset-password-component/reset-password-component.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponentComponent,
    ResultComponentComponent,
    ProfileComponentComponent,
    RegistrationComponentComponent,
    ResetPasswordComponentComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
