import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxNotifyModule } from 'another-one-notification';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxNotifyModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
