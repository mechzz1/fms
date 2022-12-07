// import { CountryInfo } from "./country-info";
import { FieldInfo } from "./field-info";

export class AddDatasetInfo {
  // country: CountryInfo;
  // Country = new CountryInfo();
  firstName: string;
  lastName: string;
  email: string;
  contact: number;
  language: string;
  fields: FieldInfo[] = [];
  pricePerRow: string;
  id: string;
}
