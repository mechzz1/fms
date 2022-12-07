import { Pipe, PipeTransform } from "@angular/core";
/**
 * Here we are giving name to our pipe ....
 */
@Pipe({
  name: "capitalization",
})
export class CapitalizationPipe implements PipeTransform {
  /**
   * This function changes strings from camel case to capital case and also places spaces between words
   * @param str this parameter contains the string to be changed.
   * @returns
   */
  transform(str) {
    str = str.replace(/([A-Z]+)/g, " $1").replace(/([A-Z][a-z])/g, " $1");
    return str.charAt(0).toUpperCase() + str.substr(1);
  }
}
