import { InjectionToken } from '@angular/core';
import { OptionsType } from '@zxcvbn-ts/core/dist/types';

export type ZxvbnConfigType = OptionsType;
export const ZXCVBN_CONFIG = new InjectionToken<ZxvbnConfigType>(
  'ZXCVBN_CONFIG'
);
