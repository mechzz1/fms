import { CustomValidatorsInfo } from "./customValidator-info";
import { OptionInfo } from "./option-info";
import { ValidatorsInfo } from "./validators-info";
/**
 * This is an export class of input info
 */
export class InputInfo {
  /**
   * it is a variable of type string
   */
  label: string;
  placeHolder: string;
  /**
   * it is a variable of type string
   */
  modelName: string;
  /**
   * it is a variable of type string
   */
  type: string;
  /**
   * it is a flag of type boolean
   */
  errorFlag = false;
  /**
   * it is a variable of type string
   */
  inputType: string;
  /**
   * it is an empty array of model validators info
   */
  customValidator: CustomValidatorsInfo;
  code: string;
  icon: string;
  scrollHeight: string;
  icon1: string;
  icon2: string;
  header: string;
  image: string;
  field: string;
  messageBody: string;
  value: string[];
  val: string;
  details: string;
  link: string;
  option: OptionInfo[] = [];
  validatorsInfo: ValidatorsInfo[] = [];
  color: string;
  number: number;
  last4: string;
  expiryMonth: string;
  expiryYear: string;
  id: string;
  contactListType: string;
  data: any[];
  disabled: boolean;
  flag: boolean;
}
