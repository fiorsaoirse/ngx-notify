import { Component, Input, OnInit } from '@angular/core';
import { NgxNotifyClasses, NgxNotifyConfig } from './ngx-notify.interface';
import { NgxNotifyService } from './ngx-notify.service';

const defaultNotificationContainerClasses: NgxNotifyClasses = {
  'ngx-notify-container': true,
};
const defaultNotificationClasses: NgxNotifyClasses = {
  alert: true,
};
const defaultCloseIconClasses: NgxNotifyClasses = {
  'ngx-notify-close': true,
};

@Component({
  selector: 'ngx-notify',
  template: `
      <div [ngClass]="containerClasses">
          <div [ngClass]="alertClasses" [ngStyle]="notifyStyles">
              {{message}}
              <span [ngClass]="closeIconClasses" (click)="closeNotification()"></span>
          </div>
      </div>
  `,
  styleUrls: ['./ngx-notify.component.scss']
})
export class NgxNotifyComponent implements OnInit {
  public containerClasses: NgxNotifyClasses;
  public alertClasses: NgxNotifyClasses;
  public closeIconClasses: NgxNotifyClasses;

  // Some styles are extracted to its own param for having an ability to change them
  public notifyStyles: object;

  private readonly hiddenClassName = 'ngx-notify-hidden';
  private readonly fadeOutClassName = 'fade-out';

  constructor(private ngxNotifyService: NgxNotifyService) {
    this.containerClasses = { ...defaultNotificationContainerClasses };
    this.alertClasses = { ...defaultNotificationClasses };
    this.closeIconClasses = { ...defaultCloseIconClasses };
    this.notifyStyles = {};
  }

  @Input()
  message!: string;
  @Input()
  type!: string;
  @Input()
  timeout!: number;
  @Input()
  config?: NgxNotifyConfig;

  ngOnInit(): void {
    this.initContainer();
    this.initAlert();
    this.initCloseIcon();
  }

  private initContainer(): void {
    const position = this.config && this.config.position || 'top';
    this.containerClasses = { ...this.containerClasses, [position]: true };
  }

  private initAlert(): void {
    if (this.config && this.config.extraClasses) {
      this.alertClasses = { ...this.alertClasses, ...this.config.extraClasses };
    }
    this.alertClasses[`alert-${this.type}`] = true;
  }

  private initCloseIcon(): void {
    const manualClose = this.config && this.config.manualClose || false;
    if (!manualClose) {
      this.closeIconClasses = { ...this.closeIconClasses, [this.hiddenClassName]: true };
      this.alertClasses = { ...this.alertClasses, [this.fadeOutClassName]: true };
      this.notifyStyles['animation-duration'] = `${this.timeout / 1000}s`;
    }
  }

  public closeNotification(): void {
    this.ngxNotifyService.close();
  }
}
