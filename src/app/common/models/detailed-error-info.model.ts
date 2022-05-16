import { RESPONSE_VALIDITY } from "../enums/response-validity.enum";

export class DetailedErrorInfo {
    errorType: RESPONSE_VALIDITY;
    errorTitle: string;
    errorHint: string;
    errorMessage: string;
    confirmLabel: string;
    cancelLabel: string;
  }