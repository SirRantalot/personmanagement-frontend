import { City } from "./city";
import { Country } from "./country";


export class ContactDetails {

  public id!: number;
  public street = '';
  public streetNumber = '';
  public email = '';
  public postalNumber = 0;
  public phoneNumber = 0;
  public city = new City();
  public country = new Country();
}
