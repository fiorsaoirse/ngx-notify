import { DOCUMENT } from '@angular/common';
import { InjectionToken, inject } from '@angular/core';

export const NGX_NOTIFY_CLOSE_ICON = new InjectionToken<string>('A path to close icon');

export const WINDOW = new InjectionToken<Window>('Window token', {
    factory: () => {
        const { defaultView } = inject(DOCUMENT);
        if (!defaultView) {
            throw new Error('Window is not enabled!');
        }
        return defaultView;
    },
});
