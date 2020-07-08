import { Injectable } from '@angular/core';
import { RestDataApiService } from './rest-data-api.service';



@Injectable({
  providedIn: 'root'
})
export class SessionService {
  foldersTypes;
  Clients;

  constructor(private restdata: RestDataApiService
               ) {
    
                }

loadClients()
{
this.restdata.getClients().subscribe(res=> {
  this.Clients=res;
})
}
loadFoldersTypes()
{
  this.restdata.getDocTypes().subscribe(res=> {
    this.foldersTypes=res;
  })
}
getClientName(id:number) : string  {
  for (let i = 0; i < this.Clients.length; i++) {
    
    let c = this.Clients[i];
    if(c.id===id)
    {
      console.log('mmmmm')
      console.log('mmmmm' + c.name)
      return c.name;
    }

  }
}
}
