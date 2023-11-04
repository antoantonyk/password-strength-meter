import { PasswordStrengthMeterZXCVBNService } from "./password-strength-meter-zxcvbn.service";
import { PSMOptions } from "angular-password-strength-meter";

export const DEFAULT_PSM_OPTIONS: PSMOptions = {
  serviceClass: PasswordStrengthMeterZXCVBNService,
};
