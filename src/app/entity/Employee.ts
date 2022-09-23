import {Gender} from "./Gender";

export class Employee{
  id : number | undefined;
  name : string | undefined;
  nic : string | undefined;
  age : number | undefined;
  gender_id : Gender | undefined;
}
