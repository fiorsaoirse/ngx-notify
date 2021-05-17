import { DOCUMENT } from '@angular/common';
import {
    ApplicationRef,
    ComponentFactoryResolver,
    ComponentRef,
    EmbeddedViewRef,
    Inject,
    Injectable,
    Injector,
    TemplateRef,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { NgxNotifyComponent } from '../components/ngx-notify.component';
import { NgxNotifyPosition, NgxNotifyType } from '../contracts/ngx-notify.enum';
import { NgxNotifyConfig } from '../contracts/ngx-notify.interface';
import { WINDOW } from '../contracts/token';
import { NgxNotifyModule } from '../ngx-notify.module';

@Injectable({
    providedIn: NgxNotifyModule,
})
export class NgxNotifyService {
    private readonly DEFAULT_TIMEOUT: number;

    private currentNotification: ComponentRef<NgxNotifyComponent> | null;

    private currentNotificationSubscription: Subscription | null;

    private timerId?: number;

    private static getComponentRootNode(componentRef: ComponentRef<any>): HTMLElement {
        const [node] = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes;
        return node as HTMLElement;
    }

    constructor(
        private readonly injector: Injector,
        private readonly applicationRef: ApplicationRef,
        private readonly componentFactoryResolver: ComponentFactoryResolver,
        @Inject(DOCUMENT) private readonly document: any,
        @Inject(WINDOW) private readonly window: any
    ) {
        this.currentNotification = null;
        this.currentNotificationSubscription = null;
        this.DEFAULT_TIMEOUT = 12000;
    }

    public createSuccessNotification(content: string | TemplateRef<any>, config?: NgxNotifyConfig): void {
        this.createNotification(content, NgxNotifyType.SUCCESS, config);
    }

    public createWarningNotification(content: string | TemplateRef<any>, config?: NgxNotifyConfig): void {
        this.createNotification(content, NgxNotifyType.WARNING, config);
    }

    public createErrorNotification(content: string | TemplateRef<any>, config?: NgxNotifyConfig): void {
        this.createNotification(content, NgxNotifyType.DANGER, config);
    }

    public createInfoNotification(content: string | TemplateRef<any>, config?: NgxNotifyConfig): void {
        this.createNotification(content, NgxNotifyType.INFO, config);
    }

    public createCustomNotification(content: string | TemplateRef<any>, config?: NgxNotifyConfig): void {
        this.createNotification(content, NgxNotifyType.CUSTOM, config);
    }

    private createNotification(
        content: string | TemplateRef<any>,
        type: NgxNotifyType,
        config?: NgxNotifyConfig
    ): void {
        const timeout = config?.timeout ?? this.DEFAULT_TIMEOUT;

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
        this.currentNotification.instance.closeable = config?.manualCloseOnly || config?.closeable;
        if (!config?.manualCloseOnly) {
            this.currentNotification.instance.timeout = timeout;
        }

        this.applicationRef.attachView(this.currentNotification.hostView);

        if (this.currentNotificationSubscription) {
            this.currentNotificationSubscription.unsubscribe();
        }

        this.currentNotificationSubscription = this.currentNotification.instance.destroy.subscribe(() => {
            this.applicationRef.detachView(this.currentNotification!.hostView);
            if (this.timerId) {
                clearTimeout(this.timerId);
            }
            this.currentNotification = null;
            this.currentNotificationSubscription?.unsubscribe();
            this.currentNotificationSubscription = null;
        });

        if (!config?.manualCloseOnly) {
            this.timerId = this.window.setTimeout(() => {
                this.currentNotification?.destroy();
            }, timeout);
        }

        const rootNode = NgxNotifyService.getComponentRootNode(this.currentNotification);
        (this.document as Document).body.appendChild(rootNode);
    }
}
