//import { Folder } from 'src/app/services/data/models/folder.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { Document } from 'src/app/services/data/models/document.model';
//import { userContact } from './data/models/userContact.model';
import { RestApiService } from './rest-api-service.service';
import { User } from '../modules/user/user.module';
//import { User } from './data/models/User';
//import { RestApiService } from './rest-api.service';

/*const auth = 'Basic ' + btoa('bmce.achraf' + ':' + 'user');
const header = new HttpHeaders(
  {Authorization: auth});
header.append('content-type', 'application/json');*/

const SEARCH_URI = 'http://192.168.8.104:8080/api/v1/search';
const API_URI = 'http://192.168.8.104:8080/api/v1';
@Injectable({
  providedIn: 'root'
})
export class RestSearchApiService {

  id;
  user: User;
  header: HttpHeaders;

  constructor(private http: HttpClient,
    private serviceU: RestApiService) {

    // this.user = new User();
    // this.user = serviceU.tst(this.user, JSON.parse(sessionStorage.getItem("bmce.master")));
    this.header = new HttpHeaders
      ({
        'content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa('bmce.master' + ":" +"user")
      });

  }

  searchFolder(folderModel, page = 1) {
    return this.http.post(SEARCH_URI + `/folders?page=${page}&size=8`, folderModel, { headers: this.header });
  }

  saveSearch(s) {

    return this.http.post(SEARCH_URI + '/save', s, { headers: this.header });

  }


  editSearch(s) {

    return this.http.put(SEARCH_URI + '/edit', s, { headers: this.header });

  }


  /*searchFolderToLink(folderModel: Folder, folderid, page: number) {
    return this.http.put(API_URI + `/link/folder/${folderid}?page=${page}&size=12`, folderModel, { headers: this.header });
  }*/
  getFrequencySearcheq(page) {
    return this.http.get(`${SEARCH_URI}/most?page=${page}&size=3`, { headers: this.header });
  }
  getFrequencySearcheqaAttrs(id) {
    return this.http.get(`${SEARCH_URI}/most/${id}`, { headers: this.header });
  }



  searchDo(doc, page: number) {
    return this.http.post<Document[]>(SEARCH_URI + "/document/?page=" + page + "&size=12", doc, { headers: this.header, responseType: "json" })
  }
  deleteSearch(id: number) {
    return this.http.delete(SEARCH_URI + "/most/" + id, { headers: this.header, responseType: "json" })
  }
  setFoldersBydoc(id) {
    this.id = id;
  }
  getFoldersBydoc(id, page) {

    return this.http.get("http://192.168.8.104:8080/api/v1/search/folders/" + id + "?page=" + page + "&size=6", { headers: this.header });

  }
  deleteLinks(id, folders) {
    return this.http.post("http://192.168.8.104:8080/api/v1/link/documentFolders/" + id, folders, { headers: this.header })
  }
  getTypeName(id:number)
  {
 
      return this.http.get("http://192.168.8.104:8080/getTypeName/"+id,{headers: this.header})
  }



  /*searchFoldersToLinkWithDocument(folder: Folder, DocumentId: any, page: number) {
    return this.http.put(API_URI + `/link/document/${DocumentId}?page=${page}&size=12`, folder, { headers: this.header });

  }*/
}
