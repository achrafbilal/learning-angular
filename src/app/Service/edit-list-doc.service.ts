import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { DocTypCat } from './data/models/doc-typ-cat';
//import {DocumentType } from './data/models/document-type';
import { User } from '../modules/user/user.module';
import { Attribute } from '../modules/attribute/attribute.module';
import { RestApiService } from './rest-api-service.service';

@Injectable({
  providedIn: 'root'
})
export class EditListDocService {

 
  user=new User();
  header:HttpHeaders;
  constructor(private http:HttpClient,servU:RestApiService) {

    //this.user=servU.tst(this.user,JSON.parse(sessionStorage.getItem("bmce.master"))); 
    this.header =new HttpHeaders
    ({
      'content-Type':  'application/json',
     // 'Authorization': 'Basic ' + btoa(this.user._username+":"+sessionStorage.getItem("user"))
     'Authorization': 'Basic ' + btoa('bmce.master' + ":" +"user")
    })
  }
  refreshHeader()
  {
      this.header=new HttpHeaders
   ({ 'Authorization': 'Basic ' + btoa('bmce.master' + ":" +"user"),
    // 'Authorization': 'Basic ' + btoa(this.user._username+":"+sessionStorage.getItem("user")),
     'Accept': 'application/json'
   })
  }

  getAll()
  {this.refreshHeader()
    return this.http.get("http://192.168.8.104:8080/alldoctype",{headers:this.header});
  }

 /*addType(docT:DocTypCat)
  {this.refreshHeader()
    return this.http.post("http://192.168.8.104:8080/adddoctype",JSON.parse(JSON.stringify(docT)),{headers:this.header});
  }*/
  delete(id:number)
  {this.refreshHeader()
    return this.http.delete("http://192.168.8.104:8080/deleteD/"+id,{headers:this.header});

  }
  getType()
  {
   return  this.http.get("http://192.168.8.104:8080/typeattr",{headers:this.header});
  }
  addAttribute(attr:Attribute)
  {
    return this.http.put("http://192.168.8.104:8080/add/attribute",attr,{headers:this.header});
  }
  getAttributes()
  {
    return this.http.get("http://192.168.8.104:8080/attributes",{headers:this.header});
  }
  newDocType(docType:DocumentType)
  {
      return this.http.put("http://192.168.8.104:8080/addTypeD", docType,{headers:this.header});
  }


  getAttrType(id:number)
  {
    return this.http.get("http://192.168.8.104:8080/getAttrsType/"+id,{headers:this.header});
  }

  getlist()
  {
    return this.http.get("http://192.168.8.104:8080/docstype",{headers:this.header});
  }
  getmylist(page :number)
  {this.refreshHeader()
 return this.http.get("http://192.168.8.104:8080/docType?page="+page+"&size=12",{headers:this.header});
  }

  deleteType(id)
  {
    return this.http.delete("http://192.168.8.104:8080/deletedocumenttype/"+id,{headers:this.header})
  }
}
