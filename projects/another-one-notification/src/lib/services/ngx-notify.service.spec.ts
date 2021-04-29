import { TestBed } from '@angular/core/testing';

import { NgxNotifyService } from './ngx-notify.service';

describe('NgxNotifyService', () => {
    let service: NgxNotifyService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(NgxNotifyService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
