import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { FolderTypeA } from '../modules/folder-type/folder-type.module';
/*import { Folder } from './models/folder.model';
import { Document } from './models/document.model';
import { Attributes } from './models/attrributes.model';
import { RestApiService } from '../rest-api.service';
import { User } from './models/User';*/
import { User } from '../modules/user/user.module';
import { RestApiService } from './rest-api-service.service';
import { Attributes } from '../modules/attributes/attributes.module';
/*
const auth = 'Basic ' + btoa('bmce.achraf' + ':' + 'user');
const header = new HttpHeaders(
  { Authorization: auth });
header.append('content-type', 'application/json');

*/

const URL = 'http://192.168.8.104:8080/api/v1/';
const EDIT_URL = 'http://192.168.8.104:8080/api/v1/edit/';
const LINK_URL = 'http://192.168.8.104:8080/api/v1/link/';






@Injectable({
  providedIn: 'root'
})
export class RestDataApiService {

  user: User;
  header: HttpHeaders;

  id;
  setFolderId(f)
  {
    this.id=f;
  }

  constructor(private httpClient: HttpClient, private serviceU: RestApiService) {

   // this.user = new User();
    //this.user = serviceU.tst(this.user, JSON.parse(sessionStorage.getItem("bmce.master")));
    this.header = new HttpHeaders
      ({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa('bmce.master' + ":" +"user")
      });
  }
  getFloderTypes() {
    this.header.append('content-type', 'application/json');
    return this.httpClient.get<FolderTypeA[]>(URL + 'foldertypes', { headers: this.header });
  }

  getClients() {
    return this.httpClient.get(URL + 'clients', { headers: this.header });
  }

  /*addFolder(f: Folder) {
    return this.httpClient.post<Folder>(URL + 'foders', f, { headers: this.header });
  }*/

  getDocTypes() {
    return this.httpClient.get(URL + 'documentstypes', { headers: this.header });
  }

  getDocTypesAttributes(type: number) {
    return this.httpClient.get<Attributes[]>(URL + `documentstypes/${type}/attr`, { headers: this.header });
  }

  getLogo() {
    return this.httpClient.get(URL + `logo`, { headers: this.header });
  }

  addDocument(d: Document) {
    return this.httpClient.post(URL + 'documents', d, { headers: this.header });
  }

  addDocumentAndUploadFile(file , document) : boolean {
    // tslint:disable-next-line: one-variable-per-declaration
    const formData: FormData = new FormData();
    //formData.append('document',JSON.stringify(document));
    formData.append('file',file);
    let existe=false;
    let headers : HttpHeaders =new HttpHeaders(
      {
        'Authorization': 'Basic ' + btoa('bmce.master' + ":" +"user")
       // 'Authorization' : 'Basic ' + btoa(this.user._username + ":" + sessionStorage.getItem("user"))
        // ,
        // 'Content-Type': 'multipart/form-data'
      }
    );
    this.addDocument(document).subscribe(
      res=>{
        this.httpClient.post(URL + 'documentfile/'+ res['id'], formData , { headers: headers }).subscribe(resp=>{
          console.log(res['id']);
          return false;
        },
        err => {
          return true;
        })
      }
    )
    return existe;
  }


  // editing region //////////////////////////////////


  editFolder(f, id) {
    return this.httpClient.put(EDIT_URL + `folder/${id}`, f, { headers: this.header });
  }

  deleteFolder(id) {
    return this.httpClient.delete(EDIT_URL + `folder/${id}`, { headers: this.header });
  }


  // linking region //////////////////////////////////
  linkFolder(id, foldersId) {
    return this.httpClient.post(LINK_URL + `folder/${id}`, foldersId, { headers: this.header });
  }
  linkDocument(id, foldersId) {
    return this.httpClient.post(LINK_URL + `document/${id}`, foldersId, { headers: this.header });
  }

  unlinkDocument(id, folderId) {
    return this.httpClient.delete(LINK_URL + `document/${id}/f/${folderId}`, { headers: this.header });
  }
  getFolderDocuments(id, page,size) {

    return this.httpClient.get(URL + `folder/${id}/documents?page=${page}&size=${size}`, { headers: this.header })

  }
  getFolderChilds(id, page,size) {

    return this.httpClient.get(URL + `folder/${id}/childs?page=${page}&size=${size}`, { headers: this.header })

  }




  // DELETE RELATIONS FOLDER PARENT CHILDS
deleteRelFolderFolders(childs)
{
  console.log("yes")
  return this.httpClient.post(URL + `folder/${this.id}/childs`,childs,{headers:this.header})
}

}
