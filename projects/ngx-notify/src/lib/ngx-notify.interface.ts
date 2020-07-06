export interface NgxNotifyClasses {
  [key: string]: boolean;
}

export interface NgxNotifyConfig {
  extraClasses?: NgxNotifyClasses;
  manualClose?: boolean;
  timeout?: number;
  position?: string;
}

export interface NgxNotifyError {
  property: string;
  description: string;
}
