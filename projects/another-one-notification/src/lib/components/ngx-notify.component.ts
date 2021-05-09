import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostBinding,
    Inject,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    Renderer2,
    TemplateRef,
    ViewChild,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { NgxNotifyPosition, NgxNotifyType } from '../contracts/ngx-notify.enum';
import { NGX_NOTIFY_CLOSE_ICON } from '../contracts/token';

@Component({
    selector: 'ngx-notify',
    templateUrl: './ngx-notify.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxNotifyComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input() public position: NgxNotifyPosition;

    @Input() public type: NgxNotifyType;

    @Input() public content: string | TemplateRef<any>;

    @Input() public extraClasses?: string | string[];

    @Input() public closeable?: boolean;

    @Input() public timeout?: number;

    @HostBinding('style.width') private _width: number;

    @Input() public set width(value: string | number) {
        if (typeof value === 'number') {
            this._width = value;
        } else {
            this._width = Number.parseInt(value, 10) ?? null;
        }
    }

    @ViewChild('contentContainer', { read: ElementRef }) private readonly contentContainer: ElementRef;

    private readonly _destroy: Subject<void>;

    private static readonly FADE_OUT_CLASS = 'ngx-notify-fade-out';

    private static getColorClass(type: NgxNotifyType): string {
        return `ngx-notify-content-${type}`;
    }

    private static getPositionClass(position: NgxNotifyPosition): string {
        return `ngx-notify-container-${position}`;
    }

    constructor(
        private readonly elementRef: ElementRef,
        private readonly renderer: Renderer2,
        @Optional() @Inject(NGX_NOTIFY_CLOSE_ICON) readonly closeIconUrl: string
    ) {
        this._destroy = new Subject<void>();
    }

    public get destroy(): Observable<void> {
        return this._destroy.asObservable();
    }

    public ngOnInit(): void {
        const positionClass = NgxNotifyComponent.getPositionClass(this.position);
        this.renderer.addClass(this.elementRef.nativeElement, 'ngx-notify-container');
        this.renderer.addClass(this.elementRef.nativeElement, positionClass);
    }

    public ngAfterViewInit(): void {
        const colorClass = NgxNotifyComponent.getColorClass(this.type);
        this.renderer.addClass(this.contentContainer.nativeElement, colorClass);

        if (this.timeout) {
            this.renderer.addClass(this.contentContainer.nativeElement, NgxNotifyComponent.FADE_OUT_CLASS);
            this.renderer.setStyle(
                this.contentContainer.nativeElement,
                'animation-duration',
                `${this.timeout / 1000}s`
            );
        }
    }

    public ngOnDestroy(): void {
        this.destroyComponent();
    }

    public close(): void {
        this.destroyComponent();
    }

    public isTemplate(content: string | TemplateRef<any>): content is TemplateRef<any> {
        return !!(content as TemplateRef<any>).elementRef;
    }

    private destroyComponent(): void {
        this._destroy.next();
        this._destroy.complete();
    }
}
