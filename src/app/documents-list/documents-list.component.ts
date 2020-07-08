import { Component, OnInit } from '@angular/core';

//import { WsService } from 'src/app/services/sockets/ws.service';
//import { FileModel } from 'src/app/services/data/file.model';
//import { OperationResultModalComponent } from '../modal/operation-result-modal/operation-result-modal.component';
import { Document } from 'src/app/modules/document/document.module';
//import { EditDocumentService } from 'src/app/services/edit-document.service';
import { Router } from '@angular/router';
//import { ConfirmationComponent } from '../modal/confirmation/confirmation.component';
//import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
//import { Folder } from 'src/app/services/data/models/folder.model';

import { ViewerComponent } from '../viewer/viewer.component';
//import { SendDocumentComponent } from '../modal/send-document/send-document.component';
import { ViewerService } from '../viewer/viewer.service';
//import { AddDocumentPopupComponent } from '../modal/add-document-popup/add-document-popup.component';
//import { MoveDocumentFromFolderComponent } from '../modal/move-document-from-folder/move-document-from-folder.component';
import { DataSharingService } from '../Service/data-sharing.service';
import { RestDataApiService } from '../Service/rest-data-api.service';
import { EditDocumentService } from '../Service/edit-document.service';
import { Folder } from '../modules/folder/folder.module';
import { FolderService } from '../Service/folder.service';
import { PreviousRouteService } from '../Service/previous-route.service';

@Component({
  selector: 'app-documents-list',
  templateUrl: './documents-list.component.html',
  styleUrls: ['./documents-list.component.scss'],
})
export class DocumentsListComponent implements OnInit {

  doc: Document;
  folder;
  showFolders = true;
  //file = new FileModel();
  documents;
  documentInfos;
  folderChilds: Folder[];
  totalePages: number;
  page = 0;
  pages: number[];
  pageSize;
  foldersPath: Folder[];
  totalFolderPages: number;
  folderPage = 0;
  docToSend:Document =new Document();
  public favoriteFoldersIds: string[];
  public isLoading: boolean;
 
  showDocuments: boolean = true;
  myFile;
fileType: string;
  constructor(public share: DataSharingService,
    private folderService: FolderService,
    private rest: RestDataApiService,
   // public ws: WsService,
    private srvDoc: EditDocumentService,
    private rt: Router,
   // private modal: NgbModal,
    private prevouis: PreviousRouteService,
  private   viewerService: ViewerService) {
    this.foldersPath = new Array<Folder>();

    //console.log('ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')

  }
  ngOnInit(): void {
   
   this.folderService.getFAvoritFoldersIds().subscribe(ids => {
      this.favoriteFoldersIds = ids;
     
      this.isLoading = true;
  
    });
    if (this.share.folderToOpen) {
      this.folder = this.share.folderToOpen;
      console.log("dazt bnt l9hba");
      this.foldersPath.push(this.share.folderToOpen);
    
      this.retrieveFolderDocuments(this.folder.id, this.folderPage);
      this.retrieveFolderChilds(this.folder.id, this.folderPage);
    }

  }
  retrieveFolderDocuments(folderId, page) {
    this.rest.getFolderDocuments(folderId, page, this.showFolders ? 8 : 12).subscribe(res => {
      this.documents = res['content'];
      const totalePages = res['totalPages'];
      this.pages = new Array<number>(totalePages);
      if (res['numberOfElements'] == 0) {
        this.showDocuments = false;
      }
      else {
        this.showDocuments = true;

      }
    });
  }
  retrieveFolderChilds(folderParentId, page) {
    this.rest.getFolderChilds(folderParentId, page, 6).subscribe(res => {
      this.folderChilds = res['content'];
      this.totalFolderPages = res['totalPages'];
      if (res['numberOfElements'] == 0) {
        this.showFolders = false;
      }
      else {
        this.showFolders = true;

      }
 
    });
  }

  openViewer(id, fileName) {
   /*
    const  viewRef = this.modal.open(ViewerComponent, { size: 'xl', centered : true } )
    viewRef.componentInstance.documentId=id;
    return
    this.file.fileId = id;
    this.file.fileName = fileName;
    this.ws.openFile(this.file);
    */
  }
 
  goPage(i) {

    this.page = i;
    this.retrieveFolderDocuments(this.folder.id, this.page);


  }
  btnPlusInfos(infos) {
    /* if(!infos)
     {
       this.documentInfos=this.documents[0]['document'];
       this.documentInfos=infos;
       $("#plusInfos").toggle("slow");
     }
     else{*/
    /*if (this.documentInfos == infos) {
      $('#plusInfos').toggle(500);
    } else {
      this.documentInfos = infos;
    }*/
    // }

  }
  unlinkDocument(id) {
    this.rest.unlinkDocument(id, this.folder['id']).subscribe(res => {

      this.retrieveFolderDocuments(this.folder.id, this.page);

    });
  }

  getDocToUp(docId: string) {
    let self = this
    this.srvDoc.getDocClass(docId).subscribe(res => {
   
      this.docToSend=new Document();
      this.docToSend=res as Document;
      this.docToSend.id=docId;
     
      self.srvDoc.getDoc(this.docToSend);
      self.rt.navigateByUrl("/dashboard/documents/edit")
    });



  }

  previousFolders() {
    if (this.folderPage > 0) {
    this.folderPage--;
      this.retrieveFolderChilds(this.folder.id, this.folderPage)


    }
  }
  nextFolders() {
    if (this.folderPage < this.totalFolderPages) {
    this.folderPage++;
      this.retrieveFolderChilds(this.folder.id, this.folderPage)

    }
  }



  openModale(state?, target?, message?) {
   /* const modalRef = this.modal.open(OperationResultModalComponent, { centered: true });
    modalRef.componentInstance.object = 'la document';
    modalRef.componentInstance.operation = target ?? 'Modification';
    modalRef.componentInstance.result = state == 1 ? 'succès' : 'echoue';
    modalRef.componentInstance.name = '';
    modalRef.componentInstance.message = message;*/
  }
  onDelete(id) {

   /* const confRef = this.modal.open(ConfirmationComponent, { centered: true });
    confRef.componentInstance.target = 'document';
    confRef.componentInstance.pass.subscribe(resp => {
      if (resp === 'yes') {
        this.srvDoc.delete(id).subscribe(res => {
          if (res) {
            this.openModale(1, 'Suppression')
          }
        },
          err => {
            //this.openModale(0, 'Suppression', 'Le dossier est containe des documents veuillez vider premièrement')
          });

      }
      confRef.dismiss();
    });*/
  }

  goToChild(folder) {
    this.share.folderToOpen = folder;
    console.log(folder)
    this.ngOnInit();


  }

  goFolderPath(f, i) {
    if (i == 0) {
      this.foldersPath = new Array<Folder>();
    }
    else {
      const pathSize = this.foldersPath.length - 1;

      for (let j = 0; j < pathSize; j++) {
        if (j >= (i - 1))
          this.foldersPath.pop();

      }
    }

    this.goToChild(f);
  }


  goBack() {
    if (this.foldersPath.length - 1 == 1) {
      this.foldersPath.pop();
      const f = this.foldersPath[this.foldersPath.length - 1];
      this.foldersPath.pop();
      this.goToChild(f);
    }
    else {
      
    this.rt.navigateByUrl('dashboard');
    }
  }

  addToFavorite(folderId: number){
    this.folderService.addToFavorite(folderId)
    .subscribe(res => {
      this.folderService.getFAvoritFoldersIds().subscribe(ids => {
        this.favoriteFoldersIds = ids; 
        this.isLoading = true;
      });
    })
  }
  isFavorite(folder: Folder)  {
      return this.favoriteFoldersIds.indexOf(folder.id) >= 0;
  }

  DeleteFavoritefolder(folderId: number){
    this.folderService.deletefavoritefolder(folderId)
    .subscribe(res => {
    
      this.folderService.getFAvoritFoldersIds().subscribe(ids => {
        this.favoriteFoldersIds = ids; 
        this.isLoading = true ;})
    })
  }
//Send doc by mail
send(d)
{/*
const confRef=  this.modal.open(SendDocumentComponent,{centered:true})
 confRef.componentInstance.id=d.id;

 d.attributeValues.forEach(element => {
  
   if(element.attribute.name=="Titre")
   {
      confRef.componentInstance.cc="Envoi de document : " +element.value.value;
    
   }
 });
 */
}

//DONWLOAD

downloadFile(id)
{

   // GET DOCUMENT
   
 this.viewerService.getFileToView(id).subscribe(res => {
   this.myFile = res; 
   this.fileType=this.myFile.contentType.split('/')[0];
   const b64Data = this.myFile.fileData as string;
   const contentType = this.myFile.contentType;
   const byteCharacters = atob(b64Data.split(',')[1]);
   const byteArrays = [];

   for (let offset = 0; offset < byteCharacters.length; offset += 512) {
     const slice = byteCharacters.slice(offset, offset + 512);

     const byteNumbers = new Array(slice.length);
     for (let i = 0; i < slice.length; i++) {
       byteNumbers[i] = slice.charCodeAt(i);
     }

     const byteArray = new Uint8Array(byteNumbers);
     byteArrays.push(byteArray);
   }

   const blob = new Blob(byteArrays, { type: contentType });
   const blobUrl = URL.createObjectURL(blob);
   const link = document.createElement('a');
   link.href = blobUrl;
   link.download = this.myFile.fileName;
 
  link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
 
 
 })
 
} 
//AJOUTER DOCUMENT A PARTIR DE DOSSIER RECENT
addDoc()
{/*
 const mdlRef =this.modal.open(AddDocumentPopupComponent,{centered:true})
 mdlRef.componentInstance.folderToLink=this.folder.id;
 mdlRef.componentInstance.resp
   .subscribe(arg =>{ if(arg=="ok")
   this.retrieveFolderDocuments(this.folder.id, this.page)
  });*/
}



//deplacer un document vers un autre dossier
moveTo(d)
{
 // this.foldersPath=new Array<Folder>();
 /*
  const mdlRef=this.modal.open(MoveDocumentFromFolderComponent,{centered:true,size:"xl"})
  mdlRef.componentInstance.selectedDocumentId=d;
  mdlRef.componentInstance.folderParentId=this.folder.id;
  mdlRef.componentInstance.Back.subscribe(r=>{
    if(r=="ok")
    {
     this.retrieveFolderDocuments(this.folder.id, this.page)
    }
  })*/
}

}
