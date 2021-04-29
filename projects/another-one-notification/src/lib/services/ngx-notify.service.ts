import {
    ApplicationRef,
    ComponentFactoryResolver,
    ComponentRef,
    Injectable,
    Injector,
    TemplateRef,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { NgxNotifyComponent } from '../components/ngx-notify.component';
import { NgxNotifyPosition, NgxNotifyType } from '../contracts/ngx-notify.enum';
import { NgxNotifyConfig } from '../contracts/ngx-notify.interface';

@Injectable({
    providedIn: 'root'
})
export class NgxNotifyService {
    private readonly defaultTimeout: number;

    private currentNotification: ComponentRef<NgxNotifyComponent> | null;

    private currentNotificationSubscription: Subscription | null;

    private timerId?: number;

    constructor(
        private readonly injector: Injector,
        private readonly applicationRef: ApplicationRef,
        private readonly componentFactoryResolver: ComponentFactoryResolver
    ) {
        this.currentNotification = null;
        this.currentNotificationSubscription = null;
        this.defaultTimeout = 8000;
    }

    public createSuccessNotification(content: string | TemplateRef<any>, config: NgxNotifyConfig): void {
        this.createNotification(content, NgxNotifyType.SUCCESS, config);
    }

    public createWarningNotification(content: string | TemplateRef<any>, config: NgxNotifyConfig): void {
        this.createNotification(content, NgxNotifyType.WARNING, config);
    }

    public createErrorNotification(content: string | TemplateRef<any>, config: NgxNotifyConfig): void {
        this.createNotification(content, NgxNotifyType.DANGER, config);
    }

    public createInfoNotification(content: string | TemplateRef<any>, config: NgxNotifyConfig): void {
        this.createNotification(content, NgxNotifyType.INFO, config);
    }

    public createCustomNotification(content: string | TemplateRef<any>, config: NgxNotifyConfig): void {
        this.createNotification(content, NgxNotifyType.CUSTOM, config);
    }

    private createNotification(
        content: string | TemplateRef<any>,
        type: NgxNotifyType,
        config?: NgxNotifyConfig
    ): void {
        const timeout = config?.timeout ?? this.defaultTimeout;
        const manual = config?.manualClose;

        // For current - ony one notification can be shown
        // TODO: or more?
        if (this.currentNotification) {
            this.currentNotification.destroy();
        }

        const factory = this.componentFactoryResolver.resolveComponentFactory(NgxNotifyComponent);
        this.currentNotification = factory.create(this.injector);

        this.currentNotification.instance.position = config?.position ?? NgxNotifyPosition.TOP;
        this.currentNotification.instance.type = type;
        this.currentNotification.instance.content = content;
        this.currentNotification.instance.extraClasses = config?.extraClasses;
        this.currentNotification.instance.manualClose = config?.manualClose;

        this.applicationRef.attachView(this.currentNotification.hostView);

        if (this.currentNotificationSubscription) {
            this.currentNotificationSubscription.unsubscribe();
        }

        this.currentNotificationSubscription = this.currentNotification.instance.destroy.subscribe(() => {
            console.log('currentNotification destroy');

            this.applicationRef.detachView(this.currentNotification!.hostView);
            if (this.timerId) {
                clearTimeout(this.timerId);
            }
            this.currentNotification = null;
            this.currentNotificationSubscription?.unsubscribe();
            this.currentNotificationSubscription = null;
        });

        if (!manual) {
            this.timerId = window.setTimeout(() => {
                console.log('timeout');
                this.currentNotification?.destroy();
            }, timeout);
        }
    }
}
