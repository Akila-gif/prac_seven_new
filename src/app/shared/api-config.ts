export class ApiConfig {
  static setUrl (query:string):string{
    let apiUrl : string =  `http://awsample.byethost7.com/New%20Project%20Practicle/ServerAppV7/${query}`;
    return apiUrl;
  }
}
