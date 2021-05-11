This is a simple tiny Angular Library that lets you create notifications at the top or bottom of your screen.

-   it's easy to use and doesn't require Angular Material
-   you can pass to the notification plain text or template as TemplateRef
-   you can customize the notification

### Installation

1. Run `npm install another-one-notification --save` in terminal
2. Import `NgxNotifyModule` to your application module.

```
import { NgxNotifyModule } from 'another-one-notification';

@NgModule({
  imports: [
    NgxNotifyModule
  ],
})
```

### Usage

1. Inject `NgxNotifyService` into your component/service.
2. Call one of the notification creation methods. You can pass a plain string or TemplateRef to the method.

```
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NgxNotifyService, NgxNotifyConfig, NgxNotifyPosition } from 'another-one-notification';

@Component({
    ...
})
export class AppComponent {

    @ViewChild('template', { read: TemplateRef }) template: TemplateRef<any>;

    constructor(private readonly ngxNotifyService: NgxNotifyService) {}

    public createPlainSuccessNotification(): void {
        this.ngxNotifyService.createSuccessNotification('Hello!');
    }

    public createTemplateWarningNotificationWithConfig(): void {
        const config: NgxNotifyConfig = {
            position: NgxNotifyPosition.BOTTOM,
            closeable: true,
            timeout: 20000,
        };

        this.ngxNotifyService.createWarningNotification(this.template, config);
    }

}

```

#### Customizing

-   By default, the notification appears at the top of the screen and disappears after 12 seconds
-   You can create custom notification configuration:

| Property        | Description                                                                                                              | Type                                              |
| --------------- | ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------- |
| extraClassses   | Defines extra css classes for ngx-notify component                                                                       | string or string[]                                |
| closeable       | Determines whether the component should have a close button                                                              | boolean                                           |
| manualCloseOnly | Determines whether the component should be closed only manualy. If set, "timeout" and "closeable" properties are ignored | boolean                                           |
| timeout         | Defines the time after which the notification will disappear, in ms                                                      | number                                            |
| width           | Defines the width of the notification element                                                                            | number or string                                  |
| position\*      | Defines the position of the notification                                                                                 | NgxNotifyPosition.TOP or NgxNotifyPosition.BOTTOM |

Also, you can provide an icon url for close button with the `NGX_NOTIFY_CLOSE_ICON` InjectionToken:

```
    providers: [
        ...
        {
            provide: NGX_NOTIFY_CLOSE_ICON,
            useValue: 'your-value-here'
        }
    ]
```
