import { NgxNotifyPosition } from './ngx-notify.enum';

/**
 * @property {string | string[]}
 * extraClassses: defines extra css classes for ngx-notify component
 * @property {boolean}
 * closeable: defines whether the component should have a close button
 * @property {boolean}
 * manualCloseOnly: defines whether the component should be closed only manualy
 * @property {number}
 * timeout
 * @property {number | string}
 * width: defines the width of the notification element
 * @propery {NgxNotifyPosition}
 * position: defines the position of the notification
 */
export interface NgxNotifyConfig {
    extraClasses?: string | string[];
    closeable?: boolean;
    manualCloseOnly?: boolean;
    timeout?: number;
    width?: number | string;
    position: NgxNotifyPosition;
}

export interface NgxNotifyError {
    property: string;
    description: string;
}
