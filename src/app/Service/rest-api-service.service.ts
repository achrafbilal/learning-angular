import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../modules/user/user.module';
//import { User } from 'src/app/services/data/models/User';
@Injectable({
  providedIn: 'root'
})
export class RestApiService{

  authenticated: boolean = false;
  us: User = new User();

  constructor(private http: HttpClient, private rt: Router) { }
  public login(username: string, password: string) {

    //let auth = 'Basic ' + btoa('bmce.master'+ ':' + 'user');

    const header = new HttpHeaders({ Authorization: 'Basic ' + btoa('bmce.master' + ":" +"user") });
    header.append('content-type', 'application/json');

    sessionStorage.setItem("pw", 'user');
    return this.http.get('http://192.168.8.104:8080/uslog'
      , { headers: header, responseType: "json" });
  }
  public tst(u: User, rs: Response) {
    try {
      u._category = rs["category"];
      u._contact = rs["contact"];
      u._email = rs["email"];
      u._fullName = rs["fullName"];
      u._isValid = rs["isValid"];
      u._lastLogin = rs["lastLogin"];
      u._master = rs["master"];
      u._nomClient = rs["nomClient"];
      u._pw = rs["pw"];
      u._registrationDate = rs["registrationDate"];
      u._userId = rs["userId"];
      u._username = rs["username"];
      u.logo = rs['logo'] as string;
    } catch (error) {
      this.rt.navigateByUrl('login');
    }
    return u;
  }


}
