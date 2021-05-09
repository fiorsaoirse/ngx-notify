import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgxNotifyModule, NgxNotifyType } from 'another-one-notification';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
    let fixture: ComponentFixture<AppComponent>;
    let applicationBody: DebugElement | null;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NgxNotifyModule],
            declarations: [AppComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(AppComponent);
        applicationBody = fixture.debugElement.parent;
    });

    it('should create the app', () => {
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    it(`should have as title 'another-one-notification-app'`, () => {
        const app = fixture.componentInstance;
        expect(app.title).toEqual('another-one-notification-app');
    });

    describe('should create success notification', () => {
        it('and dissapear after 1 sec', () => {
            expect(applicationBody).toBeTruthy();
            expect(applicationBody!.query(By.css('.ngx-notify-container'))).toBeFalsy();

            fixture.componentInstance.showPlainNotification(NgxNotifyType.SUCCESS);
            fixture.detectChanges();

            expect(applicationBody!.query(By.css('.ngx-notify-container'))).toBeTruthy();
        });
    });
});
