This is simple Angular Library that allows you to create notification at top or at bottom of your screen.

###Installation

1. Run `npm i another-one-notification --save` in terminal
2. Add `NgxNotifyModule` to your application module in **imports** section.

###Usage

1. Inject NgxNotifyService in your component/service.
2. Call methods to create messages:

| Method name          | Description                         | Required params and types | Optional Params and types |
| -------------------- | ----------------------------------- | ------------------------- | ------------------------- |
| createSuccessMessage | Creates green-colored notification  | message: string           | config: NgxNotifyConfig   |
| createWarningMessage | Creates yellow-colored notification | message: string           | config: NgxNotifyConfig   |
| createErrorMessage   | Creates red-colored notification    | message: string           | config: NgxNotifyConfig   |
| createInfoMessage    | Creates blue-colored notification   | message: string           | config: NgxNotifyConfig   |

#####Customizing

-   By default message appears at the top of your screen and disappears in 8 seconds
-   You can create custom config of NgxNotifyConfig type:

| Parameter    | Description                                                                                     | Type                  | Default value | Allowed values    |
| ------------ | ----------------------------------------------------------------------------------------------- | --------------------- | ------------- | ----------------- |
| extraClasses | Extra classes that will be added to default notification classes                                | [key: string]: string | undefined     | any               |
| manualClose  | If `true` - allowes to close notification manually. Has priority above timer                    | boolean               | false         | false or true     |
| timeout      | Allows to set your time the notification will dissappear. Won't work if "manualClose" is `true` | number                | 8000          | greater than 0    |
| position     | Defines the position of the notification - at the top or the bottom of your screen              | string                | "top"         | "top" or "bottom" |
