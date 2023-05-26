import { ContactDetails } from "./contact-details";
import { Country } from "./country";


export class Person {

  public id!: number;
  public name = '';
  public firstname = '';
  public age = 0;
  public contactDetails = new ContactDetails();
  public nationality = new Country();
}
