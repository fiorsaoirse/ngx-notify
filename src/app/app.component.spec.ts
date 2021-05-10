import { DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgxNotifyModule, NgxNotifyPosition, NgxNotifyType } from 'another-one-notification';
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

    describe('should create plain text success notification', () => {
        it('without close button at top and dissapear after 1 second', fakeAsync(() => {
            expect(applicationBody).toBeTruthy();
            expect(applicationBody!.query(By.css('.ngx-notify-container'))).toBeFalsy();

            fixture.componentInstance.showPlainNotification(NgxNotifyType.SUCCESS, false, {
                timeout: 1000,
                position: NgxNotifyPosition.TOP,
            });

            tick();
            fixture.detectChanges();

            const container = applicationBody!.query(By.css('.ngx-notify-container'));
            expect(container).toBeTruthy();
            expect(container.nativeElement.classList).toContain('ngx-notify-container-top');
            expect(container.query(By.css('.ngx-notify-content-success'))).toBeTruthy();
            expect(container.query(By.css('.ngx-notify-close-default-icon'))).toBeFalsy();

            tick(1500);
            fixture.detectChanges();

            expect(applicationBody!.query(By.css('.ngx-notify-container'))).toBeFalsy();
        }));

        it('with close button and dissapear after 2 seconds', fakeAsync(() => {
            expect(applicationBody).toBeTruthy();
            expect(applicationBody!.query(By.css('.ngx-notify-container'))).toBeFalsy();

            fixture.componentInstance.showPlainNotification(NgxNotifyType.SUCCESS, false, {
                timeout: 2000,
                closeable: true,
                position: NgxNotifyPosition.TOP,
            });

            tick();
            fixture.detectChanges();

            const container = applicationBody!.query(By.css('.ngx-notify-container'));
            expect(container).toBeTruthy();
            expect(container.query(By.css('.ngx-notify-content-success'))).toBeTruthy();
            expect(container.query(By.css('.ngx-notify-close-default-icon'))).toBeTruthy();

            tick(2100);
            fixture.detectChanges();

            expect(applicationBody!.query(By.css('.ngx-notify-container'))).toBeFalsy();
        }));

        it('only with manual close despite of wrong config params', fakeAsync(() => {
            expect(applicationBody).toBeTruthy();
            expect(applicationBody!.query(By.css('.ngx-notify-container'))).toBeFalsy();

            fixture.componentInstance.showPlainNotification(NgxNotifyType.SUCCESS, false, {
                // timeout and closeable params should be ignored!
                timeout: 1000,
                closeable: false,
                manualCloseOnly: true,
                position: NgxNotifyPosition.TOP,
            });

            tick();
            fixture.detectChanges();

            const container = applicationBody!.query(By.css('.ngx-notify-container'));
            expect(container).toBeTruthy();
            expect(container.query(By.css('.ngx-notify-content-success'))).toBeTruthy();
            expect(container.query(By.css('.ngx-notify-close-default-icon'))).toBeTruthy();

            tick(1000);
            fixture.detectChanges();

            expect(applicationBody!.query(By.css('.ngx-notify-container'))).toBeTruthy();

            container.query(By.css('.ngx-notify-close-default-icon')).nativeElement.click();

            tick(500);
            fixture.detectChanges();

            expect(applicationBody!.query(By.css('.ngx-notify-container'))).toBeFalsy();
        }));
    });

    describe('should create template info notification', () => {
        it('only with manual close at bottom', fakeAsync(() => {
            expect(applicationBody).toBeTruthy();
            expect(applicationBody!.query(By.css('.ngx-notify-container'))).toBeFalsy();

            tick();
            fixture.detectChanges();

            fixture.componentInstance.showTemplateNotification(NgxNotifyType.INFO, false, {
                // timeout and closeable params should be ignored!
                timeout: 1000,
                closeable: false,
                manualCloseOnly: true,
                position: NgxNotifyPosition.BOTTOM,
            });

            tick();
            fixture.detectChanges();

            const container = applicationBody!.query(By.css('.ngx-notify-container'));
            expect(container).toBeTruthy();
            expect(container.nativeElement.classList).toContain('ngx-notify-container-bottom');
            expect(container.query(By.css('.ngx-notify-content-info'))).toBeTruthy();
            expect(container.query(By.css('.ngx-notify-close-default-icon'))).toBeTruthy();
            expect(container.query(By.css('.template-message'))).toBeTruthy();

            tick(1000);
            fixture.detectChanges();

            expect(applicationBody!.query(By.css('.ngx-notify-container'))).toBeTruthy();

            container.query(By.css('.ngx-notify-close-default-icon')).nativeElement.click();

            tick(500);
            fixture.detectChanges();

            expect(applicationBody!.query(By.css('.ngx-notify-container'))).toBeFalsy();
        }));
    });
});
