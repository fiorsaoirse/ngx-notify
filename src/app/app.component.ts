import { Component } from '@angular/core';
import { NgxNotifyConfig, NgxNotifyService } from 'ngx-notify';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private ngxNotifyService: NgxNotifyService) {}

  sendMessage(message: string, enableConfig: boolean = false): void {
    const config: NgxNotifyConfig = {
      manualClose: true,
    };
    switch (message) {
      case 'success':
        this.ngxNotifyService.createSuccessMessage('It works!', enableConfig ? config : null);
        break;
      case 'warning':
        this.ngxNotifyService.createWarningMessage('Warning!', enableConfig ? config : null);
        break;
      case 'error':
        this.ngxNotifyService.createErrorMessage('Something went wrong!', enableConfig ? config : null);
        break;
      case 'info':
        this.ngxNotifyService.createInfoMessage('This is just test', enableConfig ? config : null);
        break;
      default:
        throw new Error(`There is no such type of message: ${message}`);
    }
  }
}
