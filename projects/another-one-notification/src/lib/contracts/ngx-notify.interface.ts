import { NgxNotifyPosition } from './ngx-notify.enum';

/**
 * @property {string | string[]}
 * extraClassses: defines extra css classes for ngx-notify component
 * @property {boolean}
 * closeable: determines whether the component should have a close button
 * @property {boolean}
 * manualCloseOnly: determines whether the component should be closed only manualy
 * @property {number}
 * timeout: defines the time after which the notification will disappear, in ms
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
