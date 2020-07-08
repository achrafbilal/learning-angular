import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RestApiService } from './rest-api-service.service';
import { User } from '../modules/user/user.module';
import { Folder } from '../modules/folder/folder.module';
import { FavoriteFolder } from '../modules/favorite-folder/favorite-folder.module';
import { Page } from '../modules/page/page.module';


/*const auth = 'Basic ' + btoa('bmce.master' + ':' + 'user');
const header = new HttpHeaders(
  {Authorization: auth});
header.append('content-type', 'application/json');*/

@Injectable({
  providedIn: 'root'
})
export class FolderService {

  user : User;
  header : HttpHeaders;

  constructor(private http: HttpClient,
              private serviceU : RestApiService) { 

    this.user=new User();
   // this.user = serviceU.tst(this.user, JSON.parse(sessionStorage.getItem("uslog")));
    this.header=new HttpHeaders
    ({
      'Authorization': 'Basic ' + btoa('bmce.master' + ":" +"user"),
      'content-Type': 'application/json',
     // 'Authorization': 'Basic ' + btoa(this.user._username + ":" + sessionStorage.getItem("pw"))
    });

  }
  public getAllFolders(pageNumber: number, pageSize: number){
    return this.http.get<Page<Folder>>(`${environment.apiUrl}/folder/last-week?page=${pageNumber}&size=${pageSize}`,{headers:this.header})
  }
  public getAllFoldersMonth(pageNumber: number, pageSize: number){
    return this.http.get<Page<Folder>>(`${environment.apiUrl}/folder/last-month?page=${pageNumber}&size=${pageSize}`,{headers:this.header})
            .pipe();
  }
  public getAllFoldersOLD(pageNumber: number, pageSize: number){
    return this.http.get<Page<Folder>>(`${environment.apiUrl}/folder/OLD?page=${pageNumber}&size=${pageSize}`,{headers:this.header})
            .pipe();
  }
  public addToFavorite(folderId: number){
    return this.http.put(`${environment.apiUrl}/favorite-folder/${folderId}`,{},{headers:this.header})
    
  }
  public getfavoritefolder( page ){
    return this.http.get<FavoriteFolder[]>(`${environment.apiUrl}/favorite-folder/Find?page=${page}&size=8` ,{headers:this.header});
  }
  public deletefavoritefolder(folderId){
    return this.http.delete(`${environment.apiUrl}/favorite-folder/${folderId}`,{headers:this.header});
  }
  public getFAvoritFoldersIds(  ){
    return this.http.get<string[]>(`${environment.apiUrl}/favorite-folder/user` ,{headers:this.header});
  }
  public CountFolderrecent(  ){
    return this.http.get<number>(`${environment.apiUrl}/folder/count` ,{headers:this.header});
  }

}
