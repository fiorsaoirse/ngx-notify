import { ApplicationRef, ComponentFactoryResolver, ComponentRef, Injectable, Injector } from '@angular/core';

import { NgxNotifyPositions, NgxNotifyType } from './ngx-notify.enum';
import { NgxNotifyComponent } from './ngx-notify.component';
import { NgxNotifyConfig, NgxNotifyError } from './ngx-notify.interface';

@Injectable()
export class NgxNotifyService {

  constructor(private injector: Injector,
              private applicationRef: ApplicationRef,
              private cfResolver: ComponentFactoryResolver) {}
  private readonly defaultTimeout = 8000;
  private componentRef!: ComponentRef<NgxNotifyComponent> | null;
  private timerId?: number;

  private static getComponentLocation(componentRef: ComponentRef<any>): HTMLElement {
    const { location } = componentRef;
    if (location) {
      return location.nativeElement;
    }
    throw new Error('Component location is not found!');
  }

  public createSuccessMessage(message: string, config?: NgxNotifyConfig): void {
    this.createNotification(NgxNotifyType.SUCCESS, message, config);
  }

  public createWarningMessage(message: string, config?: NgxNotifyConfig): void {
    this.createNotification(NgxNotifyType.WARNING, message, config);
  }

  public createErrorMessage(message: string, config?: NgxNotifyConfig): void {
    this.createNotification(NgxNotifyType.DANGER, message, config);
  }

  public createInfoMessage(message: string, config?: NgxNotifyConfig): void {
    this.createNotification(NgxNotifyType.INFO, message, config);
  }

  public close(): void {
    if (!this.componentRef) {
      return;
    }
    this.componentRef.destroy();
  }

  private createNotification(type: string, message: string, config?: NgxNotifyConfig): void {
    if (!this.validateConfig(config)) {
        console.error('Notification config is invalid, can\'t create notification!');
    }
    const timeout = config && config.timeout || this.defaultTimeout;
    const manual = config && config.manualClose || false;
    // For current - ony one notification can be shown
    if (this.componentRef) {
        this.componentRef.destroy();
      }
    const factory = this.cfResolver
        .resolveComponentFactory(NgxNotifyComponent);
    this.componentRef = factory.create(this.injector);

    this.componentRef.instance.message = message;
    this.componentRef.instance.type = type;
    this.componentRef.instance.config = config;
    this.componentRef.instance.timeout = timeout;

    const rootComponentRef = this.getRootViewContainer();
    const appComponentRootNode = NgxNotifyService.getComponentLocation(rootComponentRef);
    const notificationComponentRootNode = NgxNotifyService.getComponentLocation(this.componentRef);

    this.applicationRef.attachView(this.componentRef.hostView);

    this.componentRef.onDestroy(() => {
        if (this.componentRef === null) {
          throw new Error('ComponentRef is not found!');
        }
        this.applicationRef.detachView(this.componentRef.hostView);
        if (this.timerId) {
          clearTimeout(this.timerId);
        }
        this.componentRef = null;
      });

    appComponentRootNode.appendChild(notificationComponentRootNode);

      // Manual param has bigger priority above timer
    if (!manual) {
        this.timerId = window.setTimeout(() => this.componentRef && this.componentRef.destroy(), timeout);
      }
  }

  private getRootViewContainer(): ComponentRef<any> {
    const rootComponents = this.applicationRef.components;
    if (rootComponents.length) {
      return rootComponents[0];
    }
    throw new Error('View Container is not found!');
  }

  private validateConfig(config: NgxNotifyConfig): boolean {
    if (!config) {
      return true;
    }
    const errors: NgxNotifyError[] = [];
    const { timeout, position } = config;
    this.validateTimeout(timeout, errors);
    this.validatePosition(position, errors);
    errors.forEach((err: NgxNotifyError) => console.error(`Error for ${err.property}: ${err.description}`));
    return errors.length === 0;
  }

  private validateTimeout(timeout: number, errors: NgxNotifyError[]): void {
    if (timeout && timeout < 0) {
      errors.push({ property: 'timeout', description: 'Timeout can\'t be less than 0' });
    }
  }

  private validatePosition(value: string, errors: NgxNotifyError[]): void {
    if (!value) {
      return;
    }
    switch (value) {
      case NgxNotifyPositions.TOP:
      case NgxNotifyPositions.BOTTOM:
        return;
      default:
        errors.push({ property: 'position', description: `Unknown position value: ${value}` });
        return;
    }
  }
}
