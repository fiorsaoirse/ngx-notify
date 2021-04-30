import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NgxNotifyService, NgxNotifyType,NgxNotifyConfig } from 'another-one-notification';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'another-one-notification-app';

  @ViewChild('template', { read: TemplateRef }) template: TemplateRef<any>;

  private readonly messages: string[];

  type: typeof NgxNotifyType;

  constructor(private readonly ngxNotifyService: NgxNotifyService) {
      this.messages = [
          'Foo',
          'Bar',
          'Baz',
          'It works!',
          'Hello!',
          'Attention!',
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      ];
      this.type = NgxNotifyType;
  }

  public ngOnInit(): void {
  }

  private getMethodByType(type: NgxNotifyType): (content: string | TemplateRef<any>, config?: NgxNotifyConfig) => void | never {
      switch (type) {
          case NgxNotifyType.SUCCESS:
              return this.ngxNotifyService.createSuccessNotification.bind(this.ngxNotifyService);
          case NgxNotifyType.DANGER:
              return this.ngxNotifyService.createErrorNotification.bind(this.ngxNotifyService);
          case NgxNotifyType.INFO:
              return this.ngxNotifyService.createInfoNotification.bind(this.ngxNotifyService);
          case NgxNotifyType.WARNING:
              return this.ngxNotifyService.createWarningNotification.bind(this.ngxNotifyService);
          default:
              return this.ngxNotifyService.createCustomNotification.bind(this.ngxNotifyService);
      }
  }

  public showPlainNotification(type: NgxNotifyType): void {
      const index = this.getRandomIndex();
      const message = this.messages[index];
      const method = this.getMethodByType(type);
      method(message);
  }

  public showTemplateNotification(type: NgxNotifyType): void {
    const method = this.getMethodByType(type);
    method(this.template);
  }

  private getRandomIndex(): number {
      return Math.floor(Math.random() * (this.messages.length - 1)) + 1;
  }
}
