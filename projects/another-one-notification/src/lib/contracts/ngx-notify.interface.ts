import { NgxNotifyPosition } from './ngx-notify.enum';

export interface NgxNotifyConfig {
    extraClasses?: string | string[];
    manualClose?: boolean;
    timeout?: number;
    position: NgxNotifyPosition;
}

export interface NgxNotifyError {
    property: string;
    description: string;
}
