import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NgxNotifyService } from '../../projects/ngx-notify/src/lib/ngx-notify.service';
import { ApplicationRef } from '@angular/core';
import { NgxNotifyModule } from 'ngx-notify';

describe('Testing AppComponent with NgxNotifyService', () => {
  let service: NgxNotifyService;
  let appComponentFixture: ComponentFixture<AppComponent>;
  let appRef: ApplicationRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [NgxNotifyModule],
      providers: [NgxNotifyService]
    });

    appRef = TestBed.get(ApplicationRef);
    appComponentFixture = TestBed.createComponent<AppComponent>(AppComponent);
    appRef.components.push(appComponentFixture.componentRef);
    service = TestBed.inject(NgxNotifyService);
  });

  it('should create success notification without options', async () => {
    appComponentFixture.detectChanges();

    const rootComponent = appComponentFixture.debugElement.nativeElement as HTMLElement;
    const notifyChild = rootComponent.getElementsByTagName('ngx-notify');
    expect(notifyChild.length).toBe(0);

    const message = 'success message';
    const createdComponent = await service.createSuccessMessage(message, { manualClose: true });
    console.log(createdComponent);

    expect(notifyChild.length).toBe(1);
    console.log(notifyChild);
    const [notification] = Array.from(notifyChild);
    console.log(notification);
    expect(notification.classList.contains('alert-success')).toBeTrue();
    expect(notification.innerHTML).toBe(message);
  });

  afterEach(() => {
    // Destroy notification if exists
    service.close();
  });
});
