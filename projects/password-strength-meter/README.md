[![CI](https://github.com/antoantonyk/password-strength-meter/actions/workflows/ci-workflow.yml/badge.svg)](https://github.com/antoantonyk/password-strength-meter/actions/workflows/ci-workflow.yml)
[![npm version](https://badge.fury.io/js/angular-password-strength-meter.svg)](https://badge.fury.io/js/angular-password-strength-meter)
[![Coverage Status](https://coveralls.io/repos/github/antoantonyk/password-strength-meter/badge.svg?branch=master)](https://coveralls.io/github/antoantonyk/password-strength-meter?branch=master)

# Password Strength Meter For Angular 15

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

## Get Started

**Step 1:** npm install

```sh
npm install @zxcvbn-ts/core @zxcvbn-ts/language-en angular-password-strength-meter --save
```

**Step 2:** Import Password Strength Meter Module into your app module

```ts
....
import { PasswordStrengthMeterModule } from 'angular-password-strength-meter';

....

@NgModule({
    ...
    imports: [
        ....
        PasswordStrengthMeterModule.forRoot()
    ],
    ....
})
export class AppModule { }
```

**Step 3:** use the password-strength-meter component in your app.component.ts

```ts
  <password-strength-meter [password]="password"></password-strength-meter>
```

## Use custom zxcvbn options for the password strength meter

You can override the default zxcvbn options by providing the PSM_CONFIG.

Refer to the [zxcvbn documentation](https://zxcvbn-ts.github.io/zxcvbn/guide/getting-started) for more information.

```ts
....
import { PasswordStrengthMeterModule, PSM_CONFIG } from 'angular-password-strength-meter';
import zxcvbnCommonPackage from '@zxcvbn-ts/language-common'
import zxcvbnEnPackage from '@zxcvbn-ts/language-en'

....

@NgModule({
    ...
    imports: [
        ....
        PasswordStrengthMeterModule.forRoot()
    ],
    providers: [
      {
        provide: PSM_CONFIG,
        useValue: {
          translations: zxcvbnEnPackage.translations,
          graphs: zxcvbnCommonPackage.adjacencyGraphs,
          dictionary: {
            ...zxcvbnCommonPackage.dictionary,
            ...zxcvbnEnPackage.dictionary,
          },
        }
      }
    ],
    ....
})
export class AppModule { }
```

## Use custom password strength meter service

You can override the default password strength meter service by providing the Custom Service class as follows.

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

  scoreWithFeedback(password: string): {
    score: number;
    feedback: { warning: string; suggestions: string[] };
  } {
    // TODO - return score with feedback
    return { score: 1, feedback: { warning: '', suggestions: [] } };
  }
}
....

import { PasswordStrengthMeterModule } from 'angular-password-strength-meter';
import { CustomPsmServiceService } from './custom-psm-service.service';


@NgModule({
    ...
    imports: [
        ....
        PasswordStrengthMeterModule.forRoot({ serviceClass: CustomPsmServiceService })
    ],
    ....
})
export class AppModule { }

```

## API

| option                   |   bind   |   type   |                          default                           | description                                                                                                                                                                                                          |
| :----------------------- | :------: | :------: | :--------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| password                 | Input()  |  string  |                             -                              | password to calculate its strength                                                                                                                                                                                   |
| minPasswordLength        | Input()  |  number  |                             8                              | min length of password to calculate the strength                                                                                                                                                                     |
| enableFeedback           | Input()  | boolean  |                           false                            | to show/hide the suggestions and warning messages                                                                                                                                                                    |
| numberOfProgressBarItems | Input()  |  number  |                             5                              | change the number to update the number of progress bar items                                                                                                                                                         |
| colors                   | Input()  | string[] | ['darkred', 'orangered', 'orange', 'yellowgreen', 'green'] | to overide the meter colors, password strength range is 0 - 4, for strength 0 equals first color in the array and so on. <br /><br />Note - length of the colors array should match the number of progress bar items |
| strengthChange           | Output() |  number  |                             -                              | emits the strength of the provided password in number -> range 0 - 4                                                                                                                                                 |
