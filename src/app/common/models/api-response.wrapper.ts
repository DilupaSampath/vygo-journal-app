import { RESPONSE_VALIDITY } from "../enums/response-validity.enum";
import { DetailedErrorInfo } from "./detailed-error-info.model";

export class APIResponseWrapper {
    apiError : boolean;
    apiErrorMsg: string;
    detailedErrorInfo: DetailedErrorInfo;
    responseValidity: RESPONSE_VALIDITY;
    data : any;
    apiRequestType: any;
  }