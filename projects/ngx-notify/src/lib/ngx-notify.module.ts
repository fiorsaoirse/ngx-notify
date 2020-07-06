import { NgModule } from '@angular/core';
import { NgxNotifyComponent } from './ngx-notify.component';
import { CommonModule } from '@angular/common';
import { NgxNotifyService } from './ngx-notify.service';

@NgModule({
  declarations: [NgxNotifyComponent],
  imports: [
    CommonModule,
  ],
  providers: [
    { provide: NgxNotifyService, useClass: NgxNotifyService }
  ],
  exports: [],
  entryComponents: [NgxNotifyComponent],
})
export class NgxNotifyModule { }
