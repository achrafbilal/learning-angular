import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


const header = new HttpHeaders({ Authorization: 'Basic ' + btoa('bmce.master' + ':' + 'user') });

@Injectable({
  providedIn: 'root'
})


export class ViewerService {
 


  constructor(private http: HttpClient) {





  }


  getFile(DocumentId): Observable<Blob> {
    let uri = 'http://192.168.8.104:8080/api/v1/files/';
   
    return this.http.get(uri+DocumentId, { responseType: 'blob', headers: header });

  }
  
  getFileToView(DocumentId: string) {
    let uri = 'http://192.168.8.104:8080/api/v1/files/view/';
    return this.http.get(uri + DocumentId, { headers: header });
  }
  public getPDF(): Observable<Blob> {
    //const options = { responseType: 'blob' }; there is no use of this
    let uri = '/my/uri';
    // this.http refers to HttpClient. Note here that you cannot use the generic get<Blob> as it does not compile: instead you "choose" the appropriate API in this way.
    return this.http.get(uri, { responseType: 'blob' });
  }
}
