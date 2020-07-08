import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../modules/user/user.module';
import { RestApiService } from './rest-api-service.service';
import { Document } from 'src/app/modules/document/document.module';

@Injectable({
  providedIn: 'root'
})


export class EditDocumentService {

  docToUp: Document
  user: User
  header: HttpHeaders
  constructor(private http: HttpClient, private service: RestApiService) {

    this.user = new User();
    //this.user = this.service.tst(this.user, JSON.parse(sessionStorage.getItem("uslog")))
    this.header = new HttpHeaders
      ({
        'content-Type': 'application/json',
      //  'Authorization': 'Basic ' + btoa(this.user._username + ":" + sessionStorage.getItem("pw"))
        'Authorization': 'Basic ' + btoa('bmce.master' + ":" +"user"),
        
        
      })
  }
  getDoc(doc: Document) {

    this.docToUp = new Document();
    this.docToUp = doc;

  }
  edit(doc) {

    return this.http.post("http://192.168.8.104:8080/api/v1/edit/document", this.docToUp, { headers: this.header });
  }

  delete(id: string) {
    return this.http.delete("http://192.168.8.104:8080/api/v1/edit/delete/" + id, { headers: this.header });
  }


  getDocClass(id: string) {
    const header = new HttpHeaders
    ({
      'content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(this.user._username + ":" + sessionStorage.getItem("pw"))
    })
    return this.http.get("http://192.168.8.104:8080/api/v1/edit/docID/" + id, { headers: header });
  }
  
}