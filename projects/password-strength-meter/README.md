[![CI](https://github.com/antoantonyk/password-strength-meter/actions/workflows/ci-workflow.yml/badge.svg)](https://github.com/antoantonyk/password-strength-meter/actions/workflows/ci-workflow.yml)
[![npm version](https://badge.fury.io/js/angular-password-strength-meter.svg)](https://badge.fury.io/js/angular-password-strength-meter)
[![Coverage Status](https://coveralls.io/repos/github/antoantonyk/password-strength-meter/badge.svg?branch=master)](https://coveralls.io/github/antoantonyk/password-strength-meter?branch=master)

# Password Strength Meter For Angular 17

To display the strength of the password with a visual feedback.

[Password Strength Meter](https://www.npmjs.com/package/angular-password-strength-meter) use [zxcvbn](https://github.com/zxcvbn-ts/zxcvbn) to estimate the strength of the password and also provide a visual feedback with suggestions and warning messages.

This lib was developed based on the following [tutorial](https://scotch.io/tutorials/password-strength-meter-in-angularjs).

How then is password strength measured? `Dropbox developed an algorithm for a realistic password strength estimator inspired by password crackers. This algorithm is packaged in a Javascript library called zxcvbn. In addition, the package contains a dictionary of commonly used English words, names and passwords.`

Need lib for Vue.js? [Click here](https://github.com/antoantonyk/vue-password-strength-meter)

# Demo

[See Demo Here](https://antoantonyk.github.io/password-strength-meter/)

```html
<password-strength-meter [password]="password"></password-strength-meter>
```

[stackblitz](https://stackblitz.com/edit/stackblitz-starters-tz9tse?file=src%2Fmain.ts)

## Get Started

**Step 1:** npm install (For Angular v17)

```sh
npm install @zxcvbn-ts/core@^3.0.0 @zxcvbn-ts/language-en@^3.0.0 angular-password-strength-meter --save
```

For Angular v15

```sh
npm install @zxcvbn-ts/core@^3.0.0 @zxcvbn-ts/language-en@^3.0.0 angular-password-strength-meter@^8.0.0 --save
```

**Optional Packages:** zxcvbn packagase are not required if PasswordStrengthMeterModule is using with a custom implementation of IPasswordStrengthMeterService .

**Step 2:** Use the provideZxvbnServiceForPSM in appConfig

```ts
....
import { bootstrapApplication } from '@angular/platform-browser';
import { ApplicationConfig } from '@angular/core';
import { provideZxvbnServiceForPSM } from 'angular-password-strength-meter/zxcvbn';
....

export const appConfig: ApplicationConfig = {
  providers: [provideZxvbnServiceForPSM()],
};

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);

```

**Step 3:** Import the PasswordStrengthMeterComponent component in your app.component.ts

```ts
....
import { PasswordStrengthMeterComponent } from 'angular-password-strength-meter';
....

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    PasswordStrengthMeterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  password: string = '';
}

```

**Step 4:** use the password-strength-meter component in your app.component.html

```html
<password-strength-meter [password]="password" enableFeedback />
```

## Use custom zxcvbn options for the password strength meter

You can override the default zxcvbn options by providing the config to provideZxvbnServiceForPSM(config?: ZxvbnConfigType)

```ts
....
import { bootstrapApplication } from '@angular/platform-browser';
import { ApplicationConfig } from '@angular/core';

import { translations } from '@zxcvbn-ts/language-en';
import { provideZxvbnServiceForPSM, ZxvbnConfigType } from 'angular-password-strength-meter/zxcvbn';
....

const zxvbnConfig: ZxvbnConfigType = {
  translations: translations,
};

export const appConfig: ApplicationConfig = {
  providers: [provideZxvbnServiceForPSM(zxvbnConfig)],
};

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);

```

Refer to the [zxcvbn documentation](https://zxcvbn-ts.github.io/zxcvbn/guide/getting-started) for more information.

## Use custom password strength meter service

You can override the default password strength meter service by providing the [Custom Service class](./projects/password-strength-meter-showcase/src/app/services/custom-psm-service/custom-psm-service.service.ts)

```ts
....
import { Injectable } from '@angular/core';
import { IPasswordStrengthMeterService } from 'angular-password-strength-meter';

@Injectable()
export class CustomPsmServiceService extends IPasswordStrengthMeterService {
  score(password: string): number {
    // TODO - return score 0 - 4 based on password
    return 1;
  }

  scoreWithFeedback(password: string): FeedbackResult {
    // TODO - return score with feedback
    return { score: 1, feedback: { warning: '', suggestions: [] } };
  }

   scoreAsync(password: string): Promise<number> {
    // TODO - do some async operation
    return new Promise();
  }

  scoreWithFeedbackAsync(password: string): Promise<FeedbackResult> {
    // TODO - do some async operation
    return new Promise();
  }
}
....

@Component({
  selector: 'app-custom-service',
  standalone: true,
  imports: [CommonModule, FormsModule, PasswordStrengthMeterComponent],
  providers: [
    {
      provide: IPasswordStrengthMeterService,
      useClass: CustomPsmServiceService,
    },
  ],
  templateUrl: './custom-service.component.html',
  styleUrl: './custom-service.component.scss',
})
export class CustomServiceComponent {
  text: string = '';
  score: number | null = null;

  public onPasswordStrengthChange(score: number | null) {
    this.score = score;
  }
}

```

## API

| option                   |   bind   |   type   |                          default                           | description                                                                                                                                                                                                          |
| :----------------------- | :------: | :------: | :--------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| password                 | Input()  |  string  |                             -                              | password to calculate its strength                                                                                                                                                                                   |
| minPasswordLength        | Input()  |  number  |                             8                              | min length of password to calculate the strength                                                                                                                                                                     |
| enableFeedback           | Input()  | boolean  |                           false                            | to show/hide the suggestions and warning messages                                                                                                                                                                    |
| numberOfProgressBarItems | Input()  |  number  |                             5                              | change the number to update the number of progress bar items                                                                                                                                                         |
| enableAsync              | Input()  | boolean  |                           false                            | to do the score calculation in async mode                                                                                                                                                                            |
| colors                   | Input()  | string[] | ['darkred', 'orangered', 'orange', 'yellowgreen', 'green'] | to overide the meter colors, password strength range is 0 - 4, for strength 0 equals first color in the array and so on. <br /><br />Note - length of the colors array should match the number of progress bar items |
| strengthChange           | Output() |  number  |                             -                              | emits the strength of the provided password in number -> range 0 - 4                                                                                                                                                 |
