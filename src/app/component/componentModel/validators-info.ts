/**
 * this model class contains variable for validation
 */
import { ValidatorFn } from "@angular/forms";
/**
 * This is an export class of validators info
 */
export class ValidatorsInfo {
  /**
   *it is a property of validators info
   */
  type: ValidatorFn;
  /**
   * it is a variable of type string
   */
  msg: string;
  /**
   * it is a variable of type string
   */
  name: string;
}
